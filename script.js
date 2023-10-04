// fill select option
const role = document.getElementById('role');
const type = document.getElementById('type');
const result = document.getElementById('result');
const url = 'http://localhost:3000/data';

const roleList = ['Fighter', 'Mage', 'Support', 'Assassin', 'Marksman', 'Tank'];

roleList.forEach((element) => {
  const newOption = document.createElement('option');
  newOption.textContent = element;
  newOption.value = element;
  role.appendChild(newOption);
});

const typeList = ['Physical', 'Magic'];

typeList.forEach((element) => {
  const newOption = document.createElement('option');
  newOption.textContent = element;
  newOption.value = element;
  type.appendChild(newOption);
});

function fetchData() {
  result.innerHTML = 'Loading';

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      result.innerHTML = '';

      data.forEach((item) => {
        const node = document.createElement('div');
        node.innerHTML = `
          <div class="card my-5 mx-3 text-bg-dark" style="width: 20rem;">
              <img src="${item.img}" class="card-img-top" alt="image not responding">
              <div class="card-body">
                  <h5 class="card-text">Name : ${item.name} </h5>
                  <h5 class="card-text">Role : ${item.role} </h5>
                  <h5 class="card-text">Type : ${item.type} </h5>
                  <div class="d-flex justify-content-end">
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
      console.error('Error:', error);
      result.innerHTML = 'Error occurred while fetching data';
    });
}

function postData(event) {
  event.preventDefault();
  const nameInput = document.getElementById('name');
  const imgInput = document.getElementById('img');
  const roleInput = document.getElementById('role');
  const typeInput = document.getElementById('type');

  // Memeriksa apakah semua input telah diisi
  if (nameInput.value && imgInput.value && roleInput.value && typeInput.value) {
    const data = {
      name: nameInput.value,
      img: imgInput.value,
      role: roleInput.value,
      type: typeInput.value,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        alert('Data Berhasil Ditambahkan');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  } else {
    alert('Harap Isi Semua Form Sebelum Submit Data');
  }
}

function deleteData(id) {
  fetch(url + `/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(() => {
      fetchData(); // Refresh data after deletion
      alert('Data Berhasil Dihapus');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function editData(id) {
  alert('Anda Sekarang Dalam Mode Edit...');
  const editForm = document.getElementById('edit-form');
  const addForm = document.querySelector('form');
  const editName = document.getElementById('edit-name');
  const editImg = document.getElementById('edit-img');
  const editRole = document.getElementById('edit-role');
  const editType = document.getElementById('edit-type');

  // Mengambil data hero yang akan diedit dari server
  fetch(url + '/' + id)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // Mengisi nilai input pada form edit dengan data hero yang akan diedit
      editName.value = data.name;
      editImg.value = data.img;
      editRole.value = data.role;
      editType.value = data.type;

      editForm.setAttribute('data-id', id);
      // Mengisi opsi pada elemen <select> pada form-edit
      roleList.forEach((element) => {
        const newOption = document.createElement('option');
        newOption.textContent = element;
        newOption.value = element;
        editRole.appendChild(newOption);
      });

      typeList.forEach((element) => {
        const newOption = document.createElement('option');
        newOption.textContent = element;
        newOption.value = element;
        editType.appendChild(newOption);
      });

      // Menampilkan form edit dan menyembunyikan form tambah data
      editForm.style.display = 'block';
      addForm.style.display = 'none';
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function updateData() {
  const editForm = document.getElementById('edit-form');
  const editName = document.getElementById('edit-name');
  const editImg = document.getElementById('edit-img');
  const editRole = document.getElementById('edit-role');
  const editType = document.getElementById('edit-type');

  // Memeriksa apakah semua input pada form edit telah diisi
  if (editName.value && editImg.value && editRole.value && editType.value) {
    const data = {
      name: editName.value,
      img: editImg.value,
      role: editRole.value,
      type: editType.value,
    };

    // Mengambil ID hero yang akan diupdate dari atribut data-id pada form edit
    const id = editForm.getAttribute('data-id');

    // Mengirim permintaan PUT ke server untuk mengupdate data hero
    fetch(url + '/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
        alert('Data Berhasil Diupdate');

        // Menampilkan form tambah data dan menyembunyikan form edit
        editForm.style.display = 'none';
        document.querySelector('form').style.display = 'block';

        // Mengosongkan nilai input pada form edit
        editName.value = '';
        editImg.value = '';
        editRole.value = '';
        editType.value = '';

        // Memuat ulang data setelah update
        fetchData();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  } else {
    alert('Harap Isi Semua Form Sebelum Mengupdate Data');
  }
}

// GET all http://localhost:3000/data/
// GET detail http://localhost:3000/data/:id
// POST http://localhost:3000/data dan data
// DELETE http://localhost:3000/data/:id
// PUT http://localhost:3000/data/:id dan data
//<a href="#" class="btn btn-info me-3 mt-4" onclick="deleteData(${data[i].id})"><span class="fa-solid fa-eye" style="color: #ffffff;"></span></a>
