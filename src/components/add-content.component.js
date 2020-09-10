import React, { Component } from "react";
import contentDataService from "../services/content.service";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import myUtility from "../utils/utility";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class AddContent extends Component {
  constructor(props) {
    super(props);

    this.fileBigSelectedHandler = this.fileBigSelectedHandler.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    this.isChange = this.isChange.bind(this);
    this.saveContent = this.saveContent.bind(this);
    this.newContent = this.newContent.bind(this);

    this.state = {
      id: null,
      data:null ,
      subject:'DDC: ' ,
      content_cat_id:'0',
      buyshort: null,
      c_view:'0',
      c_body:"Your content is here. DDC: 3c hay la D2C1 ta. Chút Chéo Cô Cậu lên luôn nhe!!!",
      b_image: null,
      s_image: null,
      createdby: '',
      selectedFile: null,
      selectedBigFile:'',
      submitted: false,
      // avatar: "../avatars/commingsoon.jpg",
      message: ""
    };
  }

  onChangeUser(e) {
    this.setState({
      user: e.target.value
    });
  }
  
  isChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
        [name]:value
    });
    console.log('doi tuong : ' + name);
    console.log('gia tri : ' + value);
  }


  fileSelectedHandler = event => {
    const s_image = event.target.files[0].name

    // --- update trong phan state.* rieng, phan state.currentTrade (la object trong state) rieng
    // khi ADD thi khac: lam chung trong setState
    this.setState({
      selectedFile: event.target.files[0],
      s_image: "../uploads/" + s_image   // khong hieu sao o day khong xai event.target duoc
    })
  }

  fileBigSelectedHandler = event => {
    const b_image = event.target.files[0].name
    this.setState({
      selectedBigFile: event.target.files[0],
      b_image: "../uploads/" + b_image
    })
    console.log('b ' + this.state.selectedBigFile);
  }  

  saveContent() {
    console.log('vo content SAVE ');

    //Xu ly vu dat ten file chart small BIG neu user khong upload
    var ss_image = null;
    var bb_image = null;

    if (this.state.b_image == null) {
      console.log('content save Bigggg file');
      bb_image = '../uploads/commingsoon.jpg'
    }
    if (this.state.s_image == null) {
      console.log('content save smallllll file');
        ss_image = '../uploads/commingsoon.jpg'
    }
    console.log('ten nguoi tao ' + this.props.currUser.userInfo.user);

          // Xu ly add du lieu vao db
          var {subject,content_cat_id,c_view,c_body,b_image,s_image} = this.state;
          var data = {
            subject: subject,
            c_body: c_body,
            content_cat_id: content_cat_id,
            c_view: c_view,
            b_image: b_image === null? bb_image:b_image,
            s_image: s_image === null? ss_image:s_image,
            createdAt: Date(),
            updatedAt: null,
            createdby: this.props.currUser.userInfo.user
          };
    
    contentDataService.create(data)
      .then(response => {
        this.setState({
          // id: response.data.id,
          // user: response.data.user,
          // avatar: response.data.avatar,
          // email: response.data.email,
          // password: response.data.password,
          // isadmin: response.data.isadmin,
          submitted: true
        });
        console.log('new transaction : ' + JSON.stringify(response.data));
        this.setState({
          message: "New content: " + data.subject + " has just created sucessfully!",
        })

        // Xu ly tiep phan upload file
        myUtility.uploadFiles("upfileUploads", this.state.selectedFile);
        myUtility.uploadFiles("upfileUploads", this.state.selectedBigFile);

      })
      .catch(e => {
        console.log(e);
      });
  }

  newContent() {
    // set up san gia tri cho new user tiep
    this.setState({
      subject:'D2C1 news ' ,
      content_cat_id:'',
      c_view:'0',
      b_image: null,
      s_image: null,
      createdby:'',
      selectedFile: '../uploads/commingsoon.jpg',
      selectedBigFile: '../uploads/commingsoon.jpg',
      submitted: false
    });
  }

  render() {
    return (
      <div className="form">
        {this.state.submitted ? (
          <div className="form-container">
            <h4>You submitted successfully!</h4>


            { this.props.currUser.userInfo ? ( this.props.currUser.userInfo.isadmin === 0 ?
              <button className="btn-block btn-primary" onClick={this.newContent}>
                Add New Content
              </button>
                  : null ) : <Link to="signin">Sign-in to create new content</Link>
              }
            <a href="/contents/1?searchKeyword=">Content List  ... </a>
          </div>
        ) : (
          <div className="form-container-big">
            <li>
              <h2>Add New Content</h2>
            </li>
                  <div className="form group">
                      <input onChange={(event)=> this.isChange(event)} type="text" className="form-control" name="subject" id="subject" aria-describedby="name_text" value={this.state.subject} placeholder="Enter subject" />
                  </div>

                  <div className="form-inline">
                      <div className="form-group">
                        <label htmlFor="entry">Content Cat ID: </label>
                        <input onChange={(event)=> this.isChange(event)} type="text" className="form-inline" name="content_cat_id" id="content_cat_id" aria-describedby="name_text" placeholder="Enter stock content_cat_id"/>
                      </div>
                  </div>
                  
                  <div className="form-inline">
                  <div className="form-group">
                        <label htmlFor="entry">View: </label>
                        <input onChange={(event)=> this.isChange(event)} type="text" className="form-inline" name="c_view" id="c_view" aria-describedby="name_text" placeholder="Entry price" />
                      </div>
                  </div>

                  <div className="form-group">
                      <label>Small image
                      <input className="s_image" type="file" onChange={(e) => this.fileSelectedHandler(e)}></input>
                      </label>
                      <label>Big image
                      <input className="b_image" type="file" onChange={(e) => this.fileBigSelectedHandler(e)}></input>
                      </label>
                  </div>

                  <div className="form-group">
                                    <label>Content</label>
                                    {/* <textarea id="wmd-input" name="post-text" className="form-control" data-post-type-id="2" cols="92" rows="15" value={c_body} onChange={e => setC_body(e.target.value)} placeholder="Endter content here"></textarea> */}
                                    <CKEditor
                                        editor={ ClassicEditor }
                                        data="Your content is here. DDC: 3c hay la D2C1 ta. ChútChéo CôCậu lên luôn..."
                                        onInit={ editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log( 'Editor is ready to use!', editor );
                                        } }
                                        onChange={ ( event, editor ) => {
                                            //const data = editor.getData();
                                            this.setState({
                                              c_body: editor.getData()
                                            });
                                            // setC_body(editor.getData())  // pp cu
                                            //console.log( { event, editor, data } );
                                        } }
                                        onBlur={ ( event, editor ) => {
                                            console.log( 'Blur.', editor );
                                        } }
                                        onFocus={ ( event, editor ) => {
                                            console.log( 'Focus.', editor );
                                        } }
                                    />
                                </div>


            <button onClick={this.saveContent} className="btn btn-primary">
              Save this content
            </button>
          </div>
        )}
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  console.log('userSignin trong App.js ' + JSON.stringify(state.userSignin));
  
  return {
      // currUser: state.userSignin.userInfo  //8/3 tam doi ve userSignin
      currUser: state.userSignin
  }
}


export default connect(mapStateToProps, null)(AddContent);

//DDC: 3c hay la D2C1 ta. ChútChéo CôCậu lên luôn
