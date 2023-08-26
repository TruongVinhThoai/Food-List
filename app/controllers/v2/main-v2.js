import {
  BASE_URL,
  fetchFoodList,
  getDataForm,
  resetForm,
  searchCategory,
  searchFoodList,
  showDataForm,
  showMessage,
} from "./controller-v2.js";

// Gọi lại API
fetchFoodList();

// Tìm kiếm theo loại
window.search = () => {
  axios({
    url: BASE_URL,
    method: "GET",
  })
    .then((res) => {
      searchCategory(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Reset form khi nhấn vào thêm
window.resetForm = () => {
  resetForm();
};

// Xóa sản phẩm
window.delFood = (id) => {
  axios
    .delete(`${BASE_URL}/${id}`)
    .then((res) => {
      showMessage("Xoá thành công");
      searchFoodList();
    })
    .catch((err) => {
      console.log(err);
      showMessage("Đã có lỗi xảy ra!!!", false);
    });
};

// Thêm sản phẩm
window.addFood = () => {
  let data = getDataForm();
  axios
    .post(BASE_URL, data)
    .then((res) => {
      console.log(res);
      $("#exampleModal").modal("hide");
      // fetchFoodList();
      searchFoodList();
      showMessage("Thêm món thành công");
    })
    .catch((err) => {
      console.log(err);
      showMessage("Đã có lỗi xảy ra!!!", false);
    });
};

// Sửa sản phẩm
window.editFood = (id) => {
  $("#exampleModal").modal("show");
  document.getElementById("foodID").readOnly = true;
  axios
    .get(`${BASE_URL}/${id}`)
    .then((res) => {
      console.log(res);
      showDataForm(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Update sản phẩm
window.updateFood = () => {
  let data = getDataForm();
  axios
    .put(`${BASE_URL}/${data.id}`, data)
    .then((res) => {
      console.log(res);
      // fetchFoodList();
      searchFoodList();
      $("#exampleModal").modal("hide");
      showMessage("Cập nhật thành công");
    })
    .catch((err) => {
      console.log(err);
      showMessage("Cập nhật thất bại", false);
    });
};
