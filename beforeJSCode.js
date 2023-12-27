$("#header-addrow").hide();
$("#header-delrow").hide();
$("#excelupload").hide();

$("#search_btn").trigger("click");

$(window).on("resize", function () {
  var height =
    $(".right-content").height() -
    ($(".ui-widget-header").height() + $(".editer-content1").height() + 100);
  grid1.setHeight(height);
});

$("#cust_btn2").on("click", function () {
  const calc_ym_ser = nvl($(`#${itmobj1["calc_ym_ser"]}`).val(), "");
  if (calc_ym_ser == "") {
    msg("[년월] 필수 입력입니다.", null, "N");
    if ($("#msgconfirm").is(":visible")) {
      $("#msgconfirm").dialog("destroy");
    }
    return false;
  }
  grid1.clear();

  //get data
  "Y" == $("#LOADYN").val() &&
    $.isLoading({
      tpl: '<span class="isloading-wrapper %wrapper%"><div class="loadingio-spinner-ellipsis-bus78131cg"><div class="ldio-8a4hfl22cb6"><div></div><div></div><div></div><div></div><div></div></div></div></span>',
    });

  var dataPost = {};
  dataPost.type = "get_data";
  dataPost.menucode = $("#menucode").val();
  dataPost.calc_ym_ser = calc_ym_ser;
  $.ajax({
    type: "POST",
    url: "/ajax.do",
    data: dataPost,
    success: function (response, status, request) {
      if (status === "success") {
        const data = JSON.parse(response.trim());
        const convertData = data.map((item) => {
          let obj = {};
          obj[itmobj1["calc_ym"]] = item.calc_ym;
          obj[itmobj1["bond_debt_status"]] = item.bond_debt_status;
          obj[itmobj1["bond_debt_status_name"]] = item.bond_debt_status_name;
          obj[itmobj1["agency_cd"]] = item.agency_cd;
          obj[itmobj1["region"]] = item.region;
          obj[itmobj1["agency_name"]] = item.agency_name;
          obj[itmobj1["bond_debt_type"]] = item.bond_debt_type;
          obj[itmobj1["bond_debt_type_name"]] = item.bond_debt_type_name;
          obj[itmobj1["sales_account_cd"]] = item.sales_account_cd;
          obj[itmobj1["remark"]] = item.remark;
          obj[itmobj1["account_nm"]] = item.account_nm;
          obj[itmobj1["amount"]] = item.amount;
          obj[itmobj1["memo"]] = item.memo;

          return obj;
        });
        grid1.setData(convertData);
        $(".tuigrid-header-info.gridbtng.gridexcelbtn").text(
          `[${convertData.length}]`
        );
      }
      $.isLoading("hide");
    },
    error: function (xmlHttpRequest, txtStatus, errorThrown) {},
  });
});

$("#cust_btn3").on("click", function () {
  var gd1 = grid1.getCheckedRows();
  // if(gd1.length != 1) {
  //     msg("출력할 거래명세서를 선택해 주세요.")
  //     return;
  // }

  //get data
  var dataPost = {};
  dataPost.type = "insert";
  dataPost.menucode = "M000000831";
  dataPost.UID = nvl($("#UID").val(), "");
  dataPost.agency_cd = gd1[0][itmobj1["agency_cd"]];

  $.ajax({
    type: "POST",
    url: "/ajax.do",
    dataType: "json",
    data: dataPost,
    success: function (response, status, request) {
      if (status === "success") {
      }
    },
    error: function (xmlHttpRequest, txtStatus, errorThrown) {},
  });

  $("#print_btn").trigger("click");
});

grid1.on("check", function (event) {
  const value = grid1.getRow(event.rowKey);
  if (value[itmobj1["agency_cd"]]) {
    const rows = grid1.getRows();
    for (let i = 0; i < rows.length; i++) {
      if (
        rows[i][itmobj1["agency_cd"]] == value[itmobj1["agency_cd"]] &&
        rows[i][itmobj1["region"]] == value[itmobj1["region"]]
      )
        grid1.check(i);
    }
  }
});

grid1.on("uncheck", function (event) {
  console.log("abc");
  const value = grid1.getRow(event.rowKey);
  if (value[itmobj1["agency_cd"]]) {
    const rows = grid1.getRows();
    for (let i = 0; i < rows.length; i++) {
      if (
        rows[i][itmobj1["agency_cd"]] == value[itmobj1["agency_cd"]] &&
        rows[i][itmobj1["region"]] == value[itmobj1["region"]]
      )
        grid1.uncheck(i);
    }
  }
});
