// fill select option
const role = document.getElementById("role");
const type = document.getElementById("type");
const result = document.getElementById("result");

// 🌐 URL API untuk Production (Vercel)
// GANTI dengan MockAPI URL Anda!
// Contoh: https://6543abc123def.mockapi.io/data
const url = "GANTI_DENGAN_MOCKAPI_URL_ANDA";

let jsonData;

const roleList = ["Fighter", "Mage", "Support", "Assassin", "Marksman", "Tank"];

roleList.forEach((element) => {
  const newOption = document.createElement("option");
  newOption.textContent = element;
  newOption.value = element;
  role.appendChild(newOption);
});

const typeList = ["Physical", "Magic"];

typeList.forEach((element) => {
  const newOption = document.createElement("option");
  newOption.textContent = element;
  newOption.value = element;
  type.appendChild(newOption);
});

function fetchData() {
  result.innerHTML = "Loading";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Bad Network response");
      }
      return response.json();
    })
    .then((data) => {
      jsonData = data;
      result.innerHTML = "";

      data.forEach((item) => {
        const node = document.createElement("div");
        node.innerHTML = `
          <div class="card my-5 mx-3 text-bg-dark " style="width: 20rem;">
              <img src="${item.img}" class="card-img-top" alt="image not responding">
              <div class="card-body">
                  <h5 class="card-text">Name : ${item.name} </h5>
                  <h5 class="card-text">Role : ${item.role} </h5>
                  <h5 class="card-text">Type : ${item.type} </h5>
                  <div class="d-flex justify-content-end">
                    <a href="#" class="btn btn-info me-3 mt-4" onclick="showData(${item.id})"><span class="fa-solid fa-eye" style="color: #ffffff;"></span></a>
                    <a href="#" class="btn btn-warning me-3 mt-4" onclick="editData(${item.id})"><span class="fa-solid fa-pen" style="color: #ffffff;"></span></a>
                    <a href="#" class="btn btn-danger mt-4" onclick="deleteData(${item.id})"><span class="fa-solid fa-trash" style="color: #ffffff;"></span></a>
                  </div>
              </div>
          </div>
        `;
        result.appendChild(node);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      result.innerHTML = "Error Fetching Data";
    });
}

function postData(event) {
  event.preventDefault();
  const nameInput = document.getElementById("name");
  const imgInput = document.getElementById("img");
  const roleInput = document.getElementById("role");
  const typeInput = document.getElementById("type");

  if (nameInput.value && imgInput.value && roleInput.value && typeInput.value) {
    const highestId = jsonData.reduce((maxId, item) => Math.max(maxId, item.id), 0);
    const nextNum = (highestId + 1).toString().padStart(3, "0");

    const data = {
      num: nextNum,
      name: nameInput.value,
      img: imgInput.value,
      role: roleInput.value,
      type: typeInput.value,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        alert("Data Berhasil Ditambahkan");

        fetchData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    alert("Harap Isi Semua Form Sebelum Submit Data");
  }
}

function deleteData(id) {
  fetch(url + `/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Bad Network response");
      }
      return response.json();
    })
    .then(() => {
      fetchData();
      alert("Data Berhasil Dihapus");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function editData(id) {
  const editForm = document.getElementById("edit-form");
  const editName = document.getElementById("edit-name");
  const editImg = document.getElementById("edit-img");
  const editRole = document.getElementById("edit-role");
  const editType = document.getElementById("edit-type");

  fetch(url + "/" + id)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Bad Network response");
      }
      return response.json();
    })
    .then((data) => {
      const editTitle = document.querySelector(".modal-edit");

      editTitle.textContent = "Edit Hero " + data.name;

      editName.value = data.name;
      editImg.value = data.img;
      editRole.value = data.role;
      editType.value = data.type;

      editForm.setAttribute("data-id", id);

      roleList.forEach((element) => {
        const newOption = document.createElement("option");
        newOption.textContent = element;
        newOption.value = element;
        editRole.appendChild(newOption);
      });

      typeList.forEach((element) => {
        const newOption = document.createElement("option");
        newOption.textContent = element;
        newOption.value = element;
        editType.appendChild(newOption);
      });

      const editModal = new bootstrap.Modal(document.getElementById("editModal"));
      editModal.show();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function updateData() {
  const editForm = document.getElementById("edit-form");
  const editName = document.getElementById("edit-name");
  const editImg = document.getElementById("edit-img");
  const editRole = document.getElementById("edit-role");
  const editType = document.getElementById("edit-type");

  if (editName.value && editImg.value && editRole.value && editType.value) {
    const data = {
      name: editName.value,
      img: editImg.value,
      role: editRole.value,
      type: editType.value,
    };

    const id = editForm.getAttribute("data-id");

    data.num = id.toString().padStart(3, "0");

    fetch(url + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Bad Network response");
        }
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
        alert("Data Berhasil Diupdate");

        const editModal = new bootstrap.Modal(document.getElementById("editModal"));
        editModal.hide();

        fetchData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    alert("Harap Isi Semua Form Sebelum Mengupdate Data");
  }
}

function showData(id) {
  fetch(url + `/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Bad Network response");
      }
      return response.json();
    })
    .then((data) => {
      const modal = document.getElementById("imageModal");
      const modalImage = document.getElementById("modalImage");
      const modalTitle = document.querySelector(".title-name");
      const modalRole = document.querySelector(".modal-role");
      const modalType = document.querySelector(".modal-type");

      modalTitle.textContent = data.name;
      modalImage.src = data.img;
      modalRole.textContent = "Role : " + data.role;
      modalType.textContent = "Type : " + data.type;

      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.show();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// GET all http://localhost:3000/data/
// GET detail http://localhost:3000/data/:id
// POST http://localhost:3000/data dan data
// DELETE http://localhost:3000/data/:id
// PUT http://localhost:3000/data/:id dan data

