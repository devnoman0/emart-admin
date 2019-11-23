import React from "react";
import axios from "axios";

class Test extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: ""
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }
  onChange = e => {
    this.setState({ file: e.target.files[0] });
  };

  async handleUploadImage(ev) {
    ev.preventDefault();
    const formData = new FormData();
    formData.append("element2", this.state.file);
    formData.append("element1", "Example Text");
    await axios.post("/file/file/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.handleUploadImage}>
        <div>
          <input type="file" onChange={this.onChange} />
        </div>
        <br />
        <div>
          <button>Upload</button>
        </div>
        <img src={this.state.imageURL} alt="img" />
      </form>
    );
  }
}

export default Test;
