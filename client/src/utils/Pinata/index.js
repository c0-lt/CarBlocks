import axios from "axios";

const Pinata = {
  sendFile : async (file, callbackSuccess, callbackError) => {
    if (file) {
      // const FormData = require('form-data');
      const formData = new FormData();
      formData.append("file", file);

      const metadata = JSON.stringify({
        name: "File name",
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      console.log(`multipart/form-data; boundary=${formData._boundary}`);

      try {
        const resFile = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            maxBodyLength: "Infinity",
            headers: {
              'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
              // pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
              // pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
              Authorization:
                "Bearer " + `${process.env.REACT_APP_PINATA_API_JWT}`,
            },
          }
        );

        
        callbackSuccess(resFile.data);
        // const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        // console.log(ImgHash);
        // const ImgHashGW = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        // console.log(ImgHashGW);
        // backdrop.hideLoader();
        //Take a look at your Pinata Pinned section, you will see a new file added to you list.
      } catch (error) {
        callbackError(error);
        // console.log("Error sending File to IPFS: ");
        // console.log(error);
      }
    }
  }, 

  sendJSON : async (json, callbackSuccess, callbackError) => {
    if(json) {
      console.log(json);
      try {
        var data = JSON.stringify({
          "pinataOptions": {
            "cidVersion": 1
          },
          "pinataMetadata": {
            "name": "Carblock Test",
            "keyvalues": {
              "test": "testValue"
            }
          },
          "pinataContent": json
        });
        
        var config = {
          method: 'post',
          url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + `${process.env.REACT_APP_PINATA_API_JWT}`
          },
          data : data
        };
        
        const res = await axios(config);
        
        console.log(res.data);
        callbackSuccess(res.data);
      } catch (error) {
        callbackError(error);
        // console.log("Error sending File to IPFS: ");
        // console.log(error);
      }
    }
  },

  convertCarblockFromMetadata : (metadata) => {
    console.log(metadata);
    let mapping = {
      "Brand":"brand",
      "Model":"model",
      "Energy":"energy",
      "Registration number":"registrationNumber",
      "Kilometers":"kilometers"
    }
    let carblock = {
      brand: "",
      model: "",
      registrationNumber: "",
      kilometers: 0,
      energy: "",
      image: metadata.image
    }
    for(let a=0; a<metadata.attributes.length; a++) {
      let attribute = metadata.attributes[a];
      carblock[mapping[attribute.trait_type]] = attribute.value;
    }
    return carblock;
  }

}

export default Pinata;