export const BASE_URL = "https://64d6fb042a017531bc12e774.mockapi.io/food";

const mon_chay = true;
const con_mon = true;

let renderFoodList = (list) => {
  let contenHTML = "";
  list.reverse().forEach((food) => {
    let { id, name, category, price, discount, status, img, desc } = food;

    let trString = `<tr>
      <td>${id}</td>
      <td>${name}</td>
      <td>${category == mon_chay ? "Chay" : "Mặn"}</td>
      <td>${price}</td>
      <td>${discount}</td>
      <td>${0}</td>
      <td>${status == con_mon ? "Còn" : "Hết"}</td>
      <td>
      <button class="btn btn-info" onclick="editFood(${id})">Sửa</button>
      <button class="btn btn-danger" onclick="delFood(${id})">Xóa</button>
      </td>
    </tr>`;
    contenHTML += trString;
  });
  document.getElementById("tbodyFood").innerHTML = contenHTML;
};

export let searchCategory = (data) => {
  let searchSelection = document.getElementById("selLoai").value;
  let searchSelect = data.filter((item) => {
    const category = item.category ? "Chay" : "Mặn";
    return category.toLowerCase().includes(searchSelection?.toLowerCase());
  });
  if (searchSelection !== "all") {
    return renderFoodList(searchSelect);
  }
  return renderFoodList(data);
};

export let fetchFoodList = () => {
  axios({
    url: BASE_URL,
    method: "GET",
  })
    .then((res) => {
      renderFoodList(res.data);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export let showMessage = (mess, isSuccess = true) => {
  Toastify({
    text: mess,
    className: "info",
    style: {
      background: isSuccess ? "green" : "red",
    },
  }).showToast();
};

export let getDataForm = () => {
  let id = document.getElementById("foodID").value;
  let name = document.getElementById("tenMon").value;
  let category = document.getElementById("loai").value;
  let price = document.getElementById("giaMon").value;
  let discount = document.getElementById("khuyenMai").value;
  let status = document.getElementById("tinhTrang").value;
  let img = document.getElementById("hinhMon").value;
  let desc = document.getElementById("moTa").value;

  return {
    id,
    name,
    category,
    price,
    discount,
    status,
    img,
    desc,
    discountPrice: () => {
      return this.price * (1 - this.discount);
    },
  };
};

export let showDataForm = (item) => {
  let { id, name, category, price, discount, status, img, desc } = item;
  document.getElementById("foodID").value = id;
  document.getElementById("tenMon").value = name;
  document.getElementById("loai").value = category == mon_chay ? "Chay" : "Mặn";
  document.getElementById("giaMon").value = price;
  document.getElementById("khuyenMai").value = discount;
  document.getElementById("tinhTrang").value = status == con_mon ? "1" : "0";
  document.getElementById("hinhMon").value = img;
  document.getElementById("moTa").value = desc;
};

export let resetForm = () => {
  document.getElementById("foodID").readOnly = false;
  document.getElementById("foodID").value = "";
  document.getElementById("tenMon").value = "";
  document.getElementById("loai").value = "";
  document.getElementById("giaMon").value = "";
  document.getElementById("khuyenMai").value = "";
  document.getElementById("tinhTrang").value = "";
  document.getElementById("hinhMon").value = "";
  document.getElementById("moTa").value = "";
};
