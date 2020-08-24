import React, { Component } from 'react';
import csv from 'csv';
import dailystockDataService from "../services/dailystock.service";


class ImportCSV extends Component {
    constructor(props) {
        super(props);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        // this.finalTransaction = this.finalTransaction.bind(this);
        this.playIt = this.playIt.bind(this);
        this.handleSelectItem = this.handleSelectItem.bind(this);
        // this.getSelected = this.getSelected.bind(this);
        this.onDeleted = this.onDeleted.bind(this);
  
        this.state = {
            isShiftDown: false,
            selectedItems: [],
            lastSelectedItem: null,
            checkedBoxes: [],
            transaction1: [],
            finalTransaction: [],
            importTransaction: [],
            loading: null,
            userInfo: null,
            message: "",
            selectedFile: null,
            error: null
        };
    }


    onDeleted(){
      let newTransaction2 = [...this.state.finalTransaction]

      // var arr = Object.keys(selectedObj).map(function (i) {
      //   return selectedObj[i];
      // });
      let selectedArray = this.state.selectedItems
      
      console.log('ban dau ' + JSON.stringify(newTransaction2));
      
      var importArray = newTransaction2.filter((item) => selectedArray.includes(item.tid))

      console.log('import array ' + JSON.stringify(importArray) );

      this.setState({
        importTransaction: importArray
      })  // chi de show ra man hinh cho vui o phan render

      this.saveTransaction(importArray);

    }

    saveTransaction(importArr) {
      console.log('vo Transaction save');
      dailystockDataService.builkCreate(importArr)
        .then(response => {
          console.log('new bulk : ' + JSON.stringify(response.data));
          // this.setState({
          //   message: "New bulk: " + data + " has just created sucessfully!",
          // })
          })
        .catch(e => {
          console.log(e);
        });
  
    }
  

    SelectAll() {
      var arr = []
      
      console.log('arr ' + arr);
  
      this.state.customers.map(item => {
        // this.allSelectItem(item.id)
        arr.push(item.id.toString())
      })
      console.log('duyet tung em ' + arr);
      this.setState({
        selectedItems: arr
      })
  
      console.log('aaaaa  ' + this.state.selectedItems);
  
    }
  
    unSelectAll() {
      this.setState({
        selectedItems: []
      }, function() {
        console.log('Unselect All ' + this.state.selectedItems);
      }
      );
    }

    handleSelectItem(e) {
      let newTransaction3 = [...this.state.finalTransaction]
      const { value } = e.target;

      // Bi quyet vu duyet array selectedItem la ham Number nay day!!!
      const nextValue = this.getNextValue(Number(value));
      // Bi quyet vu duyet array selectedItem la ham Number nay day!!!
    
      this.setState({ 
        selectedItems: nextValue,   // van giu gia tri cua trong array
        lastSelectedItem: value     // them value vao array
      }, function () {
        console.log('test ' + this.state.selectedItems);
      });

    }

    getNextValue(value) {
      const { isShiftDown, selectedItems } = this.state;
      const hasBeenSelected = !selectedItems.includes(value);
    
      if (isShiftDown) {
        const newSelectedItems = this.getNewSelectedItems(value);
        // de-dupe the array using a Set
        const selections = [...new Set([...selectedItems, ...newSelectedItems])];
    
        if (!hasBeenSelected) {
          return selections.filter(item => !newSelectedItems.includes(item));
        }
    
        return selections;
      }
      
    // if it's already in there, remove it, otherwise append it
    return selectedItems.includes(value)
    ? selectedItems.filter(item => item !== value)
    : [...selectedItems, value];

    }

    playIt () {
      let final = [];
      let newTransaction2 = [...this.state.transaction1]
      this.state.transaction1.map((t_scan1, index) => {
        //t_scan1.ttype.includes("To Cover")
        if (  (t_scan1.ttype.includes("Sold") && !t_scan1.ttype.includes("Short")  ) || t_scan1.ttype.includes("Bought To Cover") ) {

                console.log('T1 ' + t_scan1.tid + " - " + t_scan1.symbol + ", price: " + t_scan1.ttype);
                // console.log('T2 before ' + JSON.stringify(newTransaction2));
              if (t_scan1.ttype.includes("Bought To Cover")) {
                var fistFoundArray = newTransaction2
                  .filter(t_scan2 => t_scan2.symbol === (t_scan1.symbol) && 
                  t_scan2.ttype !== t_scan1.ttype && t_scan2.checked === 0 &&
                  t_scan2.ttype.includes("Sold Short") )[0]
              } else if (t_scan1.ttype.includes("Sold")) {
                var fistFoundArray = newTransaction2
                  .filter(t_scan2 => t_scan2.symbol === (t_scan1.symbol) && 
                  t_scan2.ttype !== t_scan1.ttype && t_scan2.checked === 0 &&
                  t_scan2.ttype.includes("Bought") )[0]
              }
                

                if (fistFoundArray) {
                  var idFound = fistFoundArray.tid-1
                  console.log('first found ' + JSON.stringify(fistFoundArray));

                  newTransaction2[idFound] = {...newTransaction2[idFound], checked:1}
                  newTransaction2[t_scan1.tid-1] = {...newTransaction2[t_scan1.tid-1], checked:1}

                  console.log('truoc khi conver ' + (fistFoundArray.price));
                  var ttt = fistFoundArray.price.toString()
                  console.log('sau khi conver ' + Number(ttt));

                  const newT  = { 
                    "tid": fistFoundArray.tid, 
                    "title": fistFoundArray.ttype , 
                    "symbolcode": fistFoundArray.symbol,
                    "entrypoint": parseFloat(fistFoundArray.price),
                    "exitpoint": parseFloat(t_scan1.price),
                    "qty": parseFloat(t_scan1.qty),
                    "b_image": "ComingSoon.jpg",
                    "timeframe": "5 min",
                    "buyshort": (t_scan1.ttype.includes("Cover"))?2:1,
                    "import": 0
                };
                final.push(newT);
                }
          }
      });
      
      console.log('final '+ JSON.stringify(final));
      this.setState({
        finalTransaction: final
      })
      console.log('final '+ JSON.stringify(this.state.finalTransaction));
      
    }

    fileSelectedHandler = event => {
      const file = event.target.files[0]
      console.log('file SMALL selected handler ' + JSON.stringify(file));

      // var file = this.state.selectedFile;
      console.log('file duoc lua la ' + file);
      const reader = new FileReader();
      reader.readAsText(file);
      var userList1 = [];
      reader.onload = () => {
        csv.parse(reader.result, (err, data) => {
            // Tinh tu 1, bo dong header la 0
            for (var i = 1; i < data.length; i++) {
                const newUser = { 
                    "tid": i,
                    "tdate": data[i][0], 
                    "ttype": data[i][1],
                    "symbol": data[i][2],
                    "qty": parseFloat(data[i][3]),
                    "price": parseFloat(data[i][4]),
                    "checked": 0
                };
                userList1.push(newUser);
            };
            this.setState({
                transaction1: userList1
            })
          });
      }
  }

  render() {

    const wellStyles = { maxWidth: 400, margin: '0 auto 10px' };
    const fontSize = 5;

    const { trans } = this.state.finalTransaction;

    return (
      <div align="center" className="form-group">
        <br /><br /><br />
            <div className="form-group">
                <label htmlFor="products_price">CSV file</label>
                <input className="avatarfile" type="file" onChange={this.fileSelectedHandler}></input>
            </div>

            <button onClick={this.playIt} className="btn btn-primary">
              Play It Now
            </button>

            <div className="list-group">
                { 
                this.state.finalTransaction.map((transaction, index) => (

                    <div className="a" key={index}>
                      <input className="checkbox-dd"
                                    onChange={this.handleSelectItem}
                                    type="checkbox"
                                    // checked={selectedItems.includes(index.toString())}  //
                                    value={transaction.tid}
                                    id={`item-${index}`}
                      />
                      {transaction.tid + ". "} 
                      {transaction.title + " - "} 
                      {transaction.buyshort + " qty = "}
                      {transaction.qty}
                      {" Entry: " + transaction.entrypoint}
                      {" Exit: " + transaction.exitpoint}
                    </div>
                  ))}
                    <button className="btn btn-danger" onClick={this.onDeleted}>
                        Delete Selected
                      </button>
              </div>


              <div className="list-group">
                { 
                this.state.importTransaction.map((itransaction, index) => (

                    <div className="a" key={index}>
                      {itransaction.tid + ". "} 
                      {itransaction.title + " - "} 
                      {itransaction.buyshort + " qty = "}
                      {itransaction.qty}
                      {" Entry: " + itransaction.entrypoint}
                      {" Exit: " + itransaction.exitpoint}
                    </div>
                    
                  ))}
                    <button className="btn-inline btn-success">
                       {/* onClick={this.onImportClick() */}
                      IMPORT
                    </button>                    
              </div>


              

      </div>
    )
  }
}

export default ImportCSV;
