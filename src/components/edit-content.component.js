import React, { Component } from 'react';
import contentDataService from "../services/content.service";
import myUtility from "../utils/utility";
import {NavLink, Link  } from "react-router-dom";
import { connect } from 'react-redux';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class EditContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          submitted: false,
          message:null,
          currentContent: {} ,
          showForm: false,
          showAddButton: false,
          showEditButton: false,
          showDeleteButton: false,
          selectedFile: null,
          selectedBigFile: null,
          myTag: ''
        }

        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.onChangeContent_cat_id = this.onChangeContent_cat_id.bind(this);
        this.onChangeC_view = this.onChangeC_view.bind(this);
        this.onChangeS_image = this.onChangeS_image.bind(this);
        this.onChangeB_image = this.onChangeB_image.bind(this);
        this.fileBigSelectedHandler = this.fileBigSelectedHandler.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        
    }
    
    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    componentWillMount() {
        console.log('EDIT mode, param  :' + parseInt(this.props.match.params.id));   // co param id roi
        this.getContentData(parseInt(this.props.match.params.id));
    }

    getContentData(id) {
        console.log('transaction id trg edit mode: ' + id);
        contentDataService.get(id)
          .then(response => {
            this.setState({
                currentContent: response.data
            });
            console.log(response.data);
            console.log('this state currentContent ' + this.state.currentContent);
          })
          .catch(e => {
            console.log(e);
          });
    }

    backToTradingList (){
      const redirect = this.props.location.search ? this.props.location.search.split("=")[1] : '/'
      this.props.history.push("/contents/1?searchKeyword=");
    }


  //delete function
  deleteContent = (e) => {
          
    const id = this.state.currentContent.id;
    console.log('vo delete func   :  ' + id);
    // const users_id = this.state.currentUser.id;

    contentDataService.delete(id)
    .then(response => {
        console.log(response.data);
        this.setState({
          message: response.message,
          submitted: true
        })
    })
    .catch(e => {
        console.log(e);
    });
    
  }

    updateContent() {
      contentDataService.update(
        this.state.currentContent.id,
        this.state.currentContent
      )
      .then(response => {
        // Sequelize xong
        console.log('Transaction updated ' + response.data);
        this.setState({
          message: "Transaction was updated successfully!",
          submitted: true
        });
        

            // Xu ly tiep phan upload file
            myUtility.uploadFiles("upfileUploads", this.state.selectedFile);
            myUtility.uploadFiles("upfileUploads", this.state.selectedBigFile);
      })
      .catch(e => {
        console.log(e);
      });
  }

  fileSelectedHandler = event => {
    const s_image = event.target.files[0].name
    const s_imageFile = event.target.files[0]
    // console.log('e target file ' + event.target.files[0]);
    // console.log('file SMALL selected handler ' + event.target.files[0].name);

    // --- update trong phan state.* rieng, phan state.currentContent (la object trong state) rieng
    this.setState({
      selectedFile: event.target.files[0],
    })
    this.setState(function(prevState) {
      return {
        currentContent: {
          ...prevState.currentContent,
          s_image: "../uploads/" + s_image,   // khong hieu sao o day khong xai event.target duoc
        }
      };
    });
    // --- update trong phan state.* rieng, phan state.currentContent (la object trong state) rieng
  }

  
  fileBigSelectedHandler = event => {
    const b_image = event.target.files[0].name
    this.setState({
      selectedBigFile: event.target.files[0],
    })
    this.setState(function(prevState) {
      return {
        currentContent: {
          ...prevState.currentContent,
          b_image: "../uploads/" + b_image,
        }
      };
    });
  }

    onChangeS_image(e) {
        const s_image = e.target.value
        this.setState(function(prevState) {
            return {
              currentContent: {
                ...prevState.currentContent,
                s_image: s_image
              }
            };
        });
    }

    onChangeB_image(e) {
        const b_image = e.target.value
        this.setState(function(prevState) {
            return {
              currentContent: {
                ...prevState.currentContent,
                b_image: b_image
              }
            };
        });
    }

    onChangeC_view(e) {
        const entrypoint = e.target.value
        this.setState(function(prevState) {
            return {
              currentContent: {
                ...prevState.currentContent,
                entrypoint: entrypoint
              }
            };
        });
    }
    
    onChangeContent_cat_id(e) {
        const content_cat_id = e.target.value
        this.setState(function(prevState) {
            return {
              currentContent: {
                ...prevState.currentContent,
                content_cat_id: content_cat_id
              }
            };
        });
    }

    onChangeSubject(e) {
        const subject = e.target.value
        this.setState(function(prevState) {
            return {
              currentContent: {
                ...prevState.currentContent,
                subject: subject
              }
            };
        });
    }

render() {
    const { currentContent } = this.state

    return (
    <div className="card border-primary mb-3 mt-2">
        <div className="card-header"><h2>Edit content: {this.state.currentContent.subject}</h2>
            {this.state.loading && <div>Loading...</div>}
            {this.state.error && <div>{this.state.error}</div>}
            {this.state.message && <div>{this.state.message}</div>}
            <div>
              <a href="/contents/1?searchKeyword=">Content List  ... </a>
            </div>


            {this.state.submitted ? (
              <div className="form-container">
                <h4>You submitted/deleted successfully!</h4>
                {this.state.message && <div>{this.state.message}</div>}
              </div>
             ) : (

              <div className="card-body text-primary">
                <div className="row">
                    <div className="col">
                                <div className="form-group">
                                <div className="">subject</div>
                                    <input type="text" name="subject" className="form-control" value={currentContent.subject} onChange={e => this.onChangeSubject(e)}/>
                                </div>

                                <div className="form-group">
                                    <div className="">Content category ID:</div>
                                    <input type="text" className="form-check-in" value={currentContent.content_cat_id} name="content_cat_id" onChange={e => this.onChangeContent_cat_id(e)}/>
                                </div>

                                <div className="form-group">Edit file name of images: 
                                    Small image:<input type="text" className="form-control-short" value={currentContent.s_image} onChange={e => this.onChangeS_image(e)}/>
                                    <img width="30%" src={"/uploads/" + currentContent.s_image} className="img"  alt="" />
                                    Big image:<input type="text" className="form-control-short" value={currentContent.b_image} onChange={e => this.onChangeB_image(e)}/>
                                    <img width="80%" src={"/uploads/" + currentContent.b_image} className="img"  alt="" />
                                </div>
                                <div className="form-group">
                                    <div>or Upload new image: 
                                      <label>Small image
                                      <input className="ns_image" type="file" onChange={(e) => this.fileSelectedHandler(e)}></input>
                                      </label>
                                      <label>Big image
                                      <input className="nb_image" type="file" onChange={(e) => this.fileBigSelectedHandler(e)}></input>
                                      </label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="">Content body</div>
                                    
                                    <CKEditor
                                      editor={ ClassicEditor }
                                      data={currentContent.c_body}
                                      onInit={ editor => {
                                          // You can store the "editor" and use when it is needed.
                                          console.log( 'Editor is ready to use!', editor );
                                      } }
                                      onChange={ ( event, editor ) => {
                                        this.setState(function(prevState) {
                                          return {
                                            currentContent: {
                                              ...prevState.currentContent,
                                              // setC_body(editor.getData())
                                              c_body: editor.getData()
                                            }
                                          };
                                        });
                                      } }
                                      onBlur={ ( event, editor ) => {
                                          console.log( 'Blur.', editor );
                                      } }
                                      onFocus={ ( event, editor ) => {
                                          console.log( 'Focus.', editor );
                                      } }
                                    />

                                </div>


                                <div className="form-group">
                                    <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={(event) => this.updateContent(event)}>Save Changes</button>
                                    <button type="button" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteContent(e) } } className="btn btn-danger">
                                    Delete
                                    </button>
                                    <button onClick={(event) => this.backToTradingList(event)} type="button" className="btn btn-danger" data-dismiss="modal">Discard</button>
                                </div>

                    </div>
            
                </div>
            </div>
              )
            }
        </div>
    </div>
                
    )
    }
}


const mapStateToProps = (state, ownProps) => {
  console.log('userSignin trong App.js ' + JSON.stringify(state.userSignin));
  return {
      currUser: state.userSignin
  }
}

export default connect(mapStateToProps, null)(EditContent);
// export default EditTrade;
//import { connect } from 'react-redux';


