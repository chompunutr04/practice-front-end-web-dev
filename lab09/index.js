const API_URL = "https://api.thedogapi.com/v1/";
const API_KEY =
  "live_uVLDQWYxCFRpt2d5fXAR4sf60yqztnmoHAQ6prmrlpGpIY1syshSQJaCJHMspds5";

function getMyUpload() {
  fetch(`${API_URL}images/?limit=10&page=0&order=DESC`, {
    method: "GET",
    headers: {
      "x-api-key": API_KEY,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let disp = document.getElementById("disp");
      if (data.length == 0) {
        disp.innerHTML = "<p>ไม่พบรูปของท่าน กรุณาโหลดรูปก่อน</p>";
      } else {
        data.forEach((element) => {
          disp.innerHTML += `<span id="${element.id}"><img src="${element.url}" width="22%" 
          title="${element.id}"/><a href="#" onclick="deleteImage('${element.id}')">
          <img src="images/delete.png" width=20 px s></a></span>`;
          // link for delete image by id
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

getMyUpload();

function deleteImage(pid) {
  fetch(`${API_URL}images/${pid}`, {
    method: "DELETE",
    headers: {
      "x-api-key": API_KEY,
    },
  })
    .then((response) => {
      document.getElementById(pid).remove();
      // alert("Image deleted successfully"); //alert บอกว่าจะลบแล้วนะ
      // window.location.reload(); //ต้อง reload หน้่าใหม่เพื่อแสดงว่าลบไปแล้ว
      return response.json();
    })
    .then ((data) =>{})
    .catch((error) => {
      console.log(error);
    });
}
async function getIdFromApi() {
  const response = await fetch("https://api.thedogapi.com/v1/images/search");
  const data = await response.json();
  console.log(data[0].id);
  return data[0].id;
}

async function main() {
  // Get id before proceeding to step 2
  const id = await getIdFromApi();
  getDogInfo(id);
}

function getDogInfo(id) {
  if (id !== "") {
    const endPoint = `https://api.thedogapi.com/v1/images/${id}`;
    fetch(endPoint)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        document.getElementById("dogImage").src = data.url;
        document.getElementById("doginfo").innerHTML =
          "Name : " +
          data.breeds[0].name +
          "<br>" +
          "Temperament : " +
          data.breeds[0].temperament +
          "<br>" +
          "Origin : " +
          data.breeds[0].origin +
          "<br>" +
          "Life Span : " +
          data.breeds[0].life_span +
          "<br>" +
          "Wikipedia : " +
          "<a href='" +
          data.breeds[0].wikipedia_url +
          "'>Click Here</a>";
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

main();
