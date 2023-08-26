import {
  BASE_URL,
  fetchFoodList,
  getDataForm,
  resetForm,
  searchCategory,
  showDataForm,
  showMessage,
} from "./controller-v2.js";
///
///
////
///
fetchFoodList();

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

window.resetForm = () => {
  resetForm();
};

window.delFood = (id) => {
  axios
    .delete(`${BASE_URL}/${id}`)
    .then((res) => {
      showMessage("Xoá thành công");
      axios({
        url: BASE_URL,
        method: "GET",
      })
        .then((res) => {
          let searchSelection = document.getElementById("selLoai").value;
          if (searchSelection !== "all" && res?.data) {
            console.log("first");
            return searchCategory(res?.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
      showMessage("Đã có lỗi xảy ra!!!", false);
    });
};

window.addFood = () => {
  let data = getDataForm();
  axios
    .post(BASE_URL, data)
    .then((res) => {
      console.log(res);
      $("#exampleModal").modal("hide");
      fetchFoodList();
      showMessage("Thêm món thành công");
    })
    .catch((err) => {
      console.log(err);
      showMessage("Đã có lỗi xảy ra!!!", false);
    });
};

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

window.updateFood = () => {
  let data = getDataForm();
  axios
    .put(`${BASE_URL}/${data.id}`, data)
    .then((res) => {
      console.log(res);
      fetchFoodList();
      $("#exampleModal").modal("hide");
      showMessage("Cập nhật thành công");
    })
    .catch((err) => {
      console.log(err);
      showMessage("Cập nhật thất bại", false);
    });
};
