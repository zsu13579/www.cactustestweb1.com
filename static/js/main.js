$(function(){

$('#agreetable').bootstrapTable({
  data : [
    {
    "id":"1",
    "carriercd":"CHNCT",
    "partnercd":"USACG",
    "startdate":"20150101",
    "enddate":"20151231",
    "Amount":"30923.2",
    "Currency":"USD",
    "attachments":"-",
    "memo":"-",
    "Tax-included":"YES",
    },
    {
      "id":"2",
      "carriercd":"CHNCT",
      "partnercd":"DEUD1",
      "startdate":"20150101",
      "enddate":"20151231",
      "Amount":"30923.2",
      "Currency":"EUR",
      "attachments":"-",
      "memo":"-",
      "Tax-included":"YES",
    }
  ],
  columns : [
  	{
  	"field": "id",
  	"title": "id",
    "sortable": true,
    "align": 'center',
    "valign": 'middle',
    "editable": true,
    },
    {
  	"field": "carriercd",
  	"title": "Carriercd",
    "sortable": true,
    "editable": {
        type: 'text',
        title: 'Carriercd',
        validate: function (value) {
            value = $.trim(value);
            if (!value) {
                return 'This field is required';
            }
            if (!/^CHN/.test(value)) {
                return 'This field needs to start width CHN.'
            }
            var data = $('#agreetable').bootstrapTable('getData'),
                index = $(this).parents('tr').data('index');
            console.log(data[index]);
            alert(JSON.stringify(data[index]));
            return '';
        }
      }  
    },
    {
  	"field": "partnercd",
  	"title": "Partnercd",
    "sortable": true
    },
    {
  	"field": "startdate",
  	"title": "startdate",
    "sortable": true
    },
    {
  	"field": "enddate",
  	"title": "enddate",
    "sortable": true
    },
    {
  	"field": "Amount",
  	"title": "Amount",
    "sortable": true
    },
    {
    "field": "Currency",
    "title": "Currency",
    "sortable": true
    },
    {
  	"field": "attachments",
  	"title": "attachments"
    },
    {
  	"field": "memo",
  	"title": "memo"
    },
    {
  	"field": "Tax-included",
  	"title": "Tax-included"
    }
  ],
  detailView: true,
  onExpandRow: function (index, row, $detail) {

      var $detailtable = $detail.html('<table></table>').find('table');

      columns = [
        {
          "field": "uniqueId",
          "title": "uniqueId",
          "visible": false
        },
        {
          "field": "Type",
          "title": "Type"
        },
        {
          "field": "SubType",
          "title": "SubType"
        },
        {
          "field": "Status",
          "title": "Status"
        }
      ]

      data = [
        {
          "uniqueId": "1",
          "Type": "GPRS-CAP",
          "SubType": "-",
          "Status": "Yes",
        },
        {
          "uniqueId": "2",
          "Type": "NOT-TAP",
          "SubType": "-",
          "Status": "No",
        },
        {
          "uniqueId": "3",
          "Type": "COMMITMENT",
          "SubType": "Threshold",
          "Status": "Yes",
        },
        {
          "uniqueId": "4",
          "Type": "COMMITMENT",
          "SubType": "Tier",
          "Status": "Yes",
        }
      ];

      $detailtable.bootstrapTable({
        columns: columns,
        data: data,
        detailView: true, 
        onExpandRow: function (index, row, $detail) {
          var $detailtable = $detail.html('<table id="detailtable1"></table>').find('table');
          if(row.Status == "Yes"){
            if(row.Type == "GPRS-CAP"){
              buildGprsTable($detailtable)
            }else if(row.Type == "NOT-TAP"){
              buildTapTable($detailtable)
            }else if(row.Type == "COMMITMENT"){
              var c = row.SubType;
              switch(c)
              {
                case "Tier": buildCommitTierTable($detailtable);
                break;
                default: buildCommitThresholdTable($detailtable);
              }
            }else{
              buildOtherTable($detailtable, "Others")
            };
          }
        }
      });
      
      //hiderow status:no records, not success for only index work for "hideRow", uniqueId not work, maybe bug
      var detaildata = $detailtable.bootstrapTable('getData');
      // var ids = [];
      // alert(JSON.stringify(detaildata));
      for(i = 0; i < detaildata.length; i++){
        // alert($detailtable.parents('tr'));
        if(detaildata[i].Status == "No") {
          //var v_index = $detailtable.parents('tr').data('index');
          //alert(v_index);
          $detailtable.bootstrapTable("hideRow", {index:i});    
          // ids.push(detaildata[i].uniqueId);
        }
      };
      // only index work, if index change to uniqueId not work
      //alert(detaildata[1].uniqueId);
      //$detailtable.bootstrapTable("hideRow", {uniqueId:"1"});
      //for(i = 1;i <= ids.length;i++){
      //  $detailtable.bootstrapTable("hideRow", {uniqueId:ids[i-1]});
      //}

    }
});

});


function buildGprsTable($el) {

    columns = [
      {
        "field": "RoamType",
        "title": "RoamType"
      },
      {
        "field": "ReconcileCycle(Month)",
        "title": "ReconcileCycle(Month)"
      },
      {
        "field": "CNDNCycle(Month)",
        "title": "CNDNCycle(Month)"
      },
      {
        "field": "Cap(MB)",
        "title": "Cap(MB)"
      },
      {
        "field": "Fee(SDR)",
        "title": "Fee(SDR)"
      },
      {
        "field": "ChargeUnit",
        "title": "ChargeUnit"
      },
      {
        "field": "Currency",
        "title": "Currency",
      },
      {
        "field": "Tax_Included",
        "title": "Tax_Included"
      }
    ];

    data = [
      {
        "RoamType": "Inroam",
        "ReconcileCycle(Month)": 1,
        "CNDNCycle(Month)": 12,
        "Cap(MB)": 29,
        "Fee(SDR)": 0.005,
        "ChargeUnit": "KB",
        "Currency": "RMB",
        "Tax_Included": "Yes",
      },
      {
        "RoamType": "Outroam",
        "ReconcileCycle(Month)": 1,
        "CNDNCycle(Month)": 12,
        "Cap(MB)": 27,
        "Fee(SDR)": 0.005,
        "ChargeUnit": "KB",
        "Currency": "USD",
        "Tax_Included": "Yes",
      },
    ];

    $el.bootstrapTable({
        columns: columns,
        data: data,
    });
};

function buildTapTable($el) {

    columns = [
      {
        "field": "Roam_type",
        "title": "Roam_type"
      },
      {
        "field": "startdate",
        "title": "startdate",
      },
      {
        "field": "enddate",
        "title": "enddate",
      },    
      {
        "field": "MOC_Home",
        "title": "MOC_Home"
      },
      {
        "field": "MOC_Local",
        "title": "MOC_Local"
      },
      {
        "field": "MOC_Other_Roam",
        "title": "MOC_Other_Roam"
      },
      {
        "field": "MOC_Other_IDD",
        "title": "MOC_Other_IDD"
      },
      {
        "field": "ChargeUnit_IDD(seconds)",
        "title": "ChargeUnit_IDD(seconds)"
      },
      {
        "field": "SMS_MOC",
        "title": "SMS_MOC"
      },
      {
        "field": "GPRS",
        "title": "GPRS"
      },
      {
        "field": "ChargeUnit_GPRS(KB)",
        "title": "ChargeUnit_GPRS(KB)"
      },
      {
        "field": "Currency",
        "title": "Currency",
      },
      {
        "field": "Tax_included",
        "title": "Tax_included"
      }
    ];

    data = [
      {
        "Roam_type": "Inroam",
        "startdate": "20150101",
        "enddate": "20150331",
        "MOC_Home": 0.89,
        "MOC_Local": 0.79,
        "MOC_Other_ROAM": 1.29,
        "MOC_Other_IDD": 0.29,
        "ChargeUnit_IDD(seconds)": 6,
        "SMS_MOC": 1.89,
        "ChargeUnit_GPRS(KB)": 1,
        "Currency": "RMB",
        "Tax_included": "Yes",
      },
      {
        "Roam_type": "Outroam",
        "startdate": "20150101",
        "enddate": "20150331",
        "MOC_Home": 0.89,
        "MOC_Local": 0.79,
        "MOC_Other_ROAM": 1.29,
        "MOC_Other_IDD": 0.29,
        "ChargeUnit_IDD(seconds)": 6,
        "SMS_MOC": 1.89,
        "ChargeUnit_GPRS(KB)": 1,
        "Currency": "USD",
        "Tax_included": "Yes",
      },
    ];

    $el.bootstrapTable({
        columns: columns,
        data: data,
    });
};

function buildCommitTable($el) {

    columns = [
      {
        "field": "Commit_Type",
        "title": "Commit_Type"
      },
    ];

    data = [
      {
        "Commit_Type": "Threshold",
      },
    ];

    $el.bootstrapTable({
        columns: columns,
        data: data,
        detailView: true, 
        onExpandRow: function (index, row, $detail) {
          var $detailtable = $detail.html('<table></table>').find('table');
          
          var c = row.Commit_Type;
          switch(c)
          {
            case "Tier": buildCommitTierTable($detailtable);
            break;
            default: buildCommitThresholdTable($detailtable);
          }

        }
    });
};

function buildOtherTable($el) {

    columns = [
      {
        "field": "Roam_type",
        "title": "Roam_type"
      },
      {
        "field": "Tier_Type",
        "title": "Tier_Type"
      },
      {
        "field": "Tier_Layer",
        "title": "Tier_Layer"
      },
      {
        "field": "MOC_Home",
        "title": "MOC_Home"
      },
      {
        "field": "MOC_Local",
        "title": "MOC_Local"
      },
      {
        "field": "MOC_Other_Roam",
        "title": "MOC_Other_Roam"
      },
      {
        "field": "MOC_Other_IDD",
        "title": "MOC_Other_IDD"
      },
      {
        "field": "ChargeUnit_IDD(seconds)",
        "title": "ChargeUnit_IDD(seconds)"
      },
      {
        "field": "SMS_MOC",
        "title": "SMS_MOC"
      },
      {
        "field": "GPRS",
        "title": "GPRS"
      },
      {
        "field": "ChargeUnit_GPRS(KB)",
        "title": "ChargeUnit_GPRS(KB)"
      },
      {
        "field": "Currency",
        "title": "Currency",
      },
      {
        "field": "Tax_included",
        "title": "Tax_included"
      }
    ];

    data = [
      {
        "Roam_type": "Inroam",
        "MOC_Home": 0.89,
        "MOC_Local": 0.79,
        "MOC_Other_ROAM": 1.29,
        "MOC_Other_IDD": 0.29,
        "ChargeUnit_IDD(seconds)": 6,
        "SMS_MOC": 1.89,
        "ChargeUnit_GPRS(KB)": 1,
        "Currency": "RMB",
        "Tax_included": "Yes",
      },
      {
        "Roam_type": "Outroam",
        "MOC_Home": 0.89,
        "MOC_Local": 0.79,
        "MOC_Other_ROAM": 1.29,
        "MOC_Other_IDD": 0.29,
        "ChargeUnit_IDD(seconds)": 6,
        "SMS_MOC": 1.89,
        "ChargeUnit_GPRS(KB)": 1,
        "Currency": "USD",
        "Tax_included": "Yes",
      },
    ];

    $el.bootstrapTable({
        columns: columns,
        data: data,
    });
}


function buildCommitThresholdTable($el) {

    columns = [
      {
        "field": "Roam_type",
        "title": "Roam_type"
      },
      {
        "field": "Threshold_Type",
        "title": "Threshold_Type"
      },
      {
        "field": "Threshold",
        "title": "Threshold"
      },
    ];

    data = [
      {
        "Roam_type": "Inroam",
        "Threshold_Type": "Voice_ALL_ActualDuration(Min)",
        "Threshold": 1000000,
      },
      {
        "Roam_type": "Outroam",
        "Threshold_Type": "Voice_ALL_ActualDuration(Min)",
        "Threshold": 2000000,
      },
    ];

    $el.bootstrapTable({
        columns: columns,
        data: data,
    });
};


function buildCommitTierTable($el) {

    columns = [
      {
        "field": "Roam_type",
        "title": "Roam_type"
      },
      {
        "field": "Tier_Type",
        "title": "Tier_Type"
      },
      {
        "field": "Tier_Layer",
        "title": "Tier_Layer"
      },
      {
        "field": "MOC_Home",
        "title": "MOC_Home"
      },
      {
        "field": "MOC_Local",
        "title": "MOC_Local"
      },
      {
        "field": "MOC_Other_Roam",
        "title": "MOC_Other_Roam"
      },
      {
        "field": "MOC_Other_IDD",
        "title": "MOC_Other_IDD"
      },
      {
        "field": "ChargeUnit_IDD(seconds)",
        "title": "ChargeUnit_IDD(seconds)"
      },
      {
        "field": "SMS_MOC",
        "title": "SMS_MOC"
      },
      {
        "field": "GPRS",
        "title": "GPRS"
      },
      {
        "field": "ChargeUnit_GPRS(KB)",
        "title": "ChargeUnit_GPRS(KB)"
      },
      {
        "field": "Currency",
        "title": "Currency",
      },
      {
        "field": "Tax_included",
        "title": "Tax_included"
      }
    ];

    data = [
      {
        "Roam_type": "Inroam",
        "Tier_Type": "Voice_ALL_ActualDuration_Tier",
        "Tier_Layer": 1,
        "MOC_Home": 0.89,
        "MOC_Local": 0.79,
        "MOC_Other_ROAM": 1.29,
        "MOC_Other_IDD": 0.29,
        "ChargeUnit_IDD(seconds)": 6,
        "SMS_MOC": 1.89,
        "ChargeUnit_GPRS(KB)": 1,
        "Currency": "RMB",
        "Tax_included": "Yes",
      },
      {
        "Roam_type": "Outroam",
        "Tier_Type": "Voice_ALL_ActualDuration_Tier",
        "Tier_Layer": 1,
        "MOC_Home": 0.89,
        "MOC_Local": 0.79,
        "MOC_Other_ROAM": 1.29,
        "MOC_Other_IDD": 0.29,
        "ChargeUnit_IDD(seconds)": 6,
        "SMS_MOC": 1.89,
        "ChargeUnit_GPRS(KB)": 1,
        "Currency": "USD",
        "Tax_included": "Yes",
      },
    ];

    $el.bootstrapTable({
        columns: columns,
        data: data,
    });
};



// example
var $table = $('#table');

$(function () {
    buildTable($table, 8, 1);
});
function expandTable($detail, cells) {
    buildTable($detail.html('<table></table>').find('table'), cells, 2)
}

function buildTable($el, cells, rows) {
    var i, j, row,
            columns = [],
            data = [];
    for (i = 0; i < cells; i++) {
        columns.push({
            field: 'field' + i,
            title: 'Cell' + i,
            sortable: true
        });
    }
    for (i = 0; i < rows; i++) {
        row = {};
        for (j = 0; j < cells; j++) {
            row['field' + j] = 'Row-' + i + '-' + j;
        }
        data.push(row);
    }
    $el.bootstrapTable({
        columns: columns,
        data: data,
        detailView: cells > 1,
        onExpandRow: function (index, row, $detail) {
            expandTable($detail, cells - 1);
        }
    });
}