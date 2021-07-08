
export var multi = [
  {
    "name": "Jan",
    "series": [
      {
        "name": "Admin",
        "value": 200
      },
      {
        "name": "C Account",
        "value": 500
      },
      {
        "name": "S Account",
        "value": 700
      },
      {
        "name": "K Account",
        "value": 590
      }
    ]
  },

  {
    "name": "Feb",
    "series": [
      {
        "name": "Admin",
        "value": 200
      },
      {
        "name": "C Account",
        "value": 680
      },
      {
        "name": "S Account",
        "value": 500
      },
      {
        "name": "K Account",
        "value": 550
      }
    ]
  },

  {
    "name": "March",
    "series": [
      {
        "name": "Admin",
        "value": 400
      },
      {
        "name": "C Account",
        "value": 250
      },
      {
        "name": "S Account",
        "value": 600
      },
      {
        "name": "K Account",
        "value": 750
      }
    ]
  },

  {
    "name": "April",
    "series": [
      {
        "name": "Admin",
        "value": 200
      },
      {
        "name": "C Account",
        "value": 500
      },
      {
        "name": "S Account",
        "value": 700
      },
      {
        "name": "K Account",
        "value": 550
      }
    ]
  },

  {
    "name": "May",
    "series": [
      {
        "name": "Admin",
        "value": 200
      },
      {
        "name": "C Account",
        "value": 500
      },
      {
        "name": "S Account",
        "value": 700
      },
      {
        "name": "K Account",
        "value": 550
      }
    ]
  },

  {
    "name": "June",
    "series": [
      {
        "name": "Admin",
        "value": 200
      },
      {
        "name": "C Account",
        "value": 500
      },
      {
        "name": "S Account",
        "value": 700
      },
      {
        "name": "K Account",
        "value": 550
      }
    ]
  }
];

export interface IWidget {
  id: string;
  apiDataUrl: string;
  globalParameters: Map<string, any>
}


export var barchart =
{
  "data": [
    { "name1": "Jan", "name2": "Admin", "value": 200 },
    { "name1": "Jan", "name2": "C Account", "value": 500 },
    { "name1": "Jan", "name2": "S Account", "value": 700 },
    { "name1": "Jan", "name2": "K Account", "value": 590 },

    { "name1": "Feb", "name2": "Admin", "value": 200 },
    { "name1": "Feb", "name2": "C Account", "value": 680 },
    { "name1": "Feb", "name2": "S Account", "value": 500 },
    { "name1": "Feb", "name2": "K Account", "value": 550 },

    { "name1": "March", "name2": "Admin", "value": 400 },
    { "name1": "March", "name2": "C Account", "value": 250 },
    { "name1": "March", "name2": "S Account", "value": 600 },
    { "name1": "March", "name2": "K Account", "value": 750 },

    { "name1": "April", "name2": "Admin", "value": 200 },
    { "name1": "April", "name2": "C Account", "value": 500 },
    { "name1": "April", "name2": "S Account", "value": 550 },
    { "name1": "April", "name2": "K Account", "value": 700 },

    { "name1": "May", "name2": "Admin", "value": 200 },
    { "name1": "May", "name2": "C Account", "value": 500 },
    { "name1": "May", "name2": "S Account", "value": 700 },
    { "name1": "May", "name2": "K Account", "value": 550 },

    { "name1": "June", "name2": "Admin", "value": 400 },
    { "name1": "June", "name2": "C Account", "value": 250 },
    { "name1": "June", "name2": "S Account", "value": 600 },
    { "name1": "June", "name2": "K Account", "value": 750 },

    { "name1": "July", "name2": "Admin", "value": 200 },
    { "name1": "July", "name2": "C Account", "value": 500 },
    { "name1": "July", "name2": "S Account", "value": 700 },
    { "name1": "July", "name2": "K Account", "value": 590 },
  ],

};

export var barchart2 =
{
  "data": [
    { "name1": "Jan", "name2": "Basic User", "value": 200 },
    { "name1": "Jan", "name2": "Devices", "value": 500 },
    { "name1": "Jan", "name2": "Voice Mail", "value": 700 },


    { "name1": "Feb", "name2": "Basic User", "value": 200 },
    { "name1": "Feb", "name2": "Devices", "value": 680 },
    { "name1": "Feb", "name2": "Voice Mail", "value": 500 },

    { "name1": "March", "name2": "Basic User", "value": 400 },
    { "name1": "March", "name2": "Devices", "value": 250 },
    { "name1": "March", "name2": "Voice Mail", "value": 600 },

    { "name1": "April", "name2": "Basic User", "value": 200 },
    { "name1": "April", "name2": "Devices", "value": 500 },
    { "name1": "April", "name2": "Voice Mail", "value": 550 },

    { "name1": "May", "name2": "Basic User", "value": 200 },
    { "name1": "May", "name2": "Devices", "value": 500 },
    { "name1": "May", "name2": "Voice Mail", "value": 700 },

    { "name1": "June", "name2": "Basic User", "value": 400 },
    { "name1": "June", "name2": "Devices", "value": 250 },
    { "name1": "June", "name2": "Voice Mail", "value": 600 },

    { "name1": "July", "name2": "Basic User", "value": 200 },
    { "name1": "July", "name2": "Devices", "value": 500 },
    { "name1": "July", "name2": "Voice Mail", "value": 700 },

  ],

};

export var PieChart =
{

  "data": [
    { "code": "Admin", "itemcount": 894, "name": "Admin" },
    { "code": "C Account", "itemcount": 500, "name": "C Account" },
    { "code": "S Account", "itemcount": 720, "name": "S Account" },
    { "code": "K Account", "itemcount": 620, "name": "K Account" },
  ]

}

export var LineChart =
{

  "data": [
    { "name1": "Benin", "name2": "2016", "value": 3820 },
    { "name1": "Benin", "name2": "2017", "value": 4024 },
    { "name1": "Benin", "name2": "2018", "value": 4073 },
    { "name1": "Benin", "name2": "2019", "value": 5303 },
    { "name1": "Benin", "name2": "2020", "value": 4453 },

    { "name1": "Sao", "name2": "2016", "value": 6322 },
    { "name1": "Sao", "name2": "2017", "value": 4828 },
    { "name1": "Sao", "name2": "2018", "value": 4175 },
    { "name1": "Sao", "name2": "2019", "value": 3715 },
    { "name1": "Sao", "name2": "2020", "value": 3673 }

  ]

}


export var TlDataA3 =
{
  "data": [
    {
      "position": 1,
      "name": "FileName.csv",
      "status": "Successful",
      "symbol": "remove_red_eye",
    },
    {
      "position": 2,
      "name": "FileName2.csv",
      "status": "Canceled",
      "symbol": "remove_red_eye"
    },
    {
      "position": 3,
      "name": "FileName3.csv",
      "status": "Successful",
      "symbol": "remove_red_eye"
    },
    {
      "position": 4,
      "name": "FileName4.csv",
      "status": "Pending",
      "symbol": ""
    },
    {
      "position": 5,
      "name": "FileName5.csv",
      "status": "Error",
      "symbol": "remove_red_eye"
    },
    {
      "position": 6,
      "name": "FileName6.csv",
      "status": "Error",
      "symbol": "remove_red_eye"
    },
    {
      "position": 7,
      "name": "FileName7.csv",
      "status": "Successful",
      "symbol": ""
    },
    {
      "position": 8,
      "name": "FileName8.csv",
      "status": "Pending",
      "symbol": ""
    },
    {
      "position": 9,
      "name": "FileName9.csv",
      "status": "Successful",
      "symbol": ""
    },
    {
      "position": 10,
      "name": "FileName10.csv",
      "status": "Successful",
      "symbol": "remove_red_eye"
    },
    {
      "position": 11,
      "name": "FileName.csv",
      "status": "Successful",
      "symbol": "remove_red_eye"
    },
    {
      "position": 12,
      "name": "FileName.csv",
      "status": "Successful",
      "symbol": "remove_red_eye"
    },
    {
      "position": 13,
      "name": "FileName.csv",
      "status": "Successful",
      "symbol": "remove_red_eye"
    },
    {
      "position": 14,
      "name": "FileName.csv",
      "status": "Successful",
      "symbol": "remove_red_eye"
    },
    {
      "position": 15,
      "name": "FileName.csv",
      "status": "Successful",
      "symbol": "remove_red_eye"
    },
    {
      "position": 16,
      "name": "FileName.csv",
      "status": "Successful",
      "symbol": "remove_red_eye"
    },
    {
      "position": 17,
      "name": "FileName.csv",
      "status": "Successful",
      "symbol": ""
    },
    {
      "position": 18,
      "name": "FileName.csv",
      "status": "Successful",
      "symbol": ""
    },
    {
      "position": 19,
      "name": "FileName.csv",
      "status": "Successful",
      "symbol": "remove_red_eye"
    },
    {
      "position": 20,
      "name": "FileName.csv",
      "status": "Successful",
      "symbol": ""
    }
  ]

}

export var TlDataA2 =
{
  "data":
    [
      {
        "position": 1,
        "name": "Voicemail",
        "weight": 1.0079,
        "symbol": "expand_more",
        "symbol2": "expand_less",
        "description": [
          {
            "maintext": "Announce CID",
            "subtext": "List"
          },
          {
            "maintext": "Password",
            "subtext": "Text"
          },
          {
            "maintext": "Email",
            "subtext": "List"
          },
          {
            "maintext": "Header2",
            "subtext": "Text"
          },
          {
            "maintext": "Header3",
            "subtext": "Text"
          },
          {
            "maintext": "Header4",
            "subtext": "Text"
          },
          {
            "maintext": "Header5",
            "subtext": "Text"
          },
          {
            "maintext": "Header6",
            "subtext": "Text"
          },
          {
            "maintext": "Header7",
            "subtext": "List"
          },
          {
            "maintext": "Header8",
            "subtext": "Text"
          },
          {
            "maintext": "Header9",
            "subtext": "Text"
          },
          {
            "maintext": "Header10",
            "subtext": "Text"
          }
        ]
      },
      {
        "position": 2,
        "name": "Template 1",
        "weight": 4.0026,
        "symbol": "expand_more",
        "symbol2": "expand_less",
        "description": [
          {
            "maintext": "Header1",
            "subtext": "Text"
          },
          {
            "maintext": "Header2",
            "subtext": "List"
          },
          {
            "maintext": "Header3",
            "subtext": "Text"
          },
          {
            "maintext": "Header4",
            "subtext": "Text"
          },
          {
            "maintext": "Header5",
            "subtext": "Text"
          },
          {
            "maintext": "Header6",
            "subtext": "Text"
          },
          {
            "maintext": "Header7",
            "subtext": "List"
          },
          {
            "maintext": "Header8",
            "subtext": "Text"
          },
          {
            "maintext": "Header9",
            "subtext": "Text"
          },
          {
            "maintext": "Header10",
            "subtext": "Text"
          },
          {
            "maintext": "Header11",
            "subtext": "Text"
          },
          {
            "maintext": "Header12",
            "subtext": "List"
          },
          {
            "maintext": "Header13",
            "subtext": "Text"
          },
          {
            "maintext": "Header14",
            "subtext": "Text"
          },
          {
            "maintext": "Header15",
            "subtext": "Text"
          },
          {
            "maintext": "Header16",
            "subtext": "Text"
          }
        ]
      },
      {
        "position": 3,
        "name": "Template 2",
        "weight": 6.941,
        "symbol": "expand_more",
        "symbol2": "expand_less",
        "description": [
          {
            "maintext": "Header1",
            "subtext": "Text"
          },
          {
            "maintext": "Header2",
            "subtext": "List"
          },
          {
            "maintext": "Header3",
            "subtext": "Text"
          },
          {
            "maintext": "Header4",
            "subtext": "Text"
          },
          {
            "maintext": "Header5",
            "subtext": "Text"
          },
          {
            "maintext": "Header6",
            "subtext": "Text"
          },
          {
            "maintext": "Header7",
            "subtext": "List"
          },
          {
            "maintext": "Header8",
            "subtext": "Text"
          },
          {
            "maintext": "Header9",
            "subtext": "Text"
          },
          {
            "maintext": "Header10",
            "subtext": "Text"
          },
          {
            "maintext": "Header11",
            "subtext": "Text"
          },
          {
            "maintext": "Header12",
            "subtext": "List"
          },
          {
            "maintext": "Header13",
            "subtext": "Text"
          },
          {
            "maintext": "Header14",
            "subtext": "Text"
          },
          {
            "maintext": "Header15",
            "subtext": "Text"
          },
          {
            "maintext": "Header16",
            "subtext": "Text"
          }
        ]
      },
      {
        "position": 4,
        "name": "Template 3",
        "weight": 9.0122,
        "symbol": "expand_more",
        "symbol2": "expand_less",
        "description": [
          {
            "maintext": "Header1",
            "subtext": "Text"
          },
          {
            "maintext": "Header2",
            "subtext": "List"
          },
          {
            "maintext": "Header3",
            "subtext": "Text"
          },
          {
            "maintext": "Header4",
            "subtext": "Text"
          },
          {
            "maintext": "Header5",
            "subtext": "Text"
          },
          {
            "maintext": "Header6",
            "subtext": "Text"
          },
          {
            "maintext": "Header7",
            "subtext": "List"
          },
          {
            "maintext": "Header8",
            "subtext": "Text"
          },
          {
            "maintext": "Header9",
            "subtext": "Text"
          },
          {
            "maintext": "Header10",
            "subtext": "Text"
          },
          {
            "maintext": "Header11",
            "subtext": "Text"
          },
          {
            "maintext": "Header12",
            "subtext": "List"
          },
          {
            "maintext": "Header13",
            "subtext": "Text"
          },
          {
            "maintext": "Header14",
            "subtext": "Text"
          },
          {
            "maintext": "Header15",
            "subtext": "Text"
          },
          {
            "maintext": "Header16",
            "subtext": "Text"
          }
        ]
      },
      {
        "position": 5,
        "name": "Template 4",
        "weight": 10.811,
        "symbol": "expand_more",
        "symbol2": "expand_less",
        "description": [
          {
            "maintext": "Header1",
            "subtext": "Text"
          },
          {
            "maintext": "Header2",
            "subtext": "List"
          },
          {
            "maintext": "Header3",
            "subtext": "Text"
          },
          {
            "maintext": "Header4",
            "subtext": "Text"
          },
          {
            "maintext": "Header5",
            "subtext": "Text"
          },
          {
            "maintext": "Header6",
            "subtext": "Text"
          },
          {
            "maintext": "Header7",
            "subtext": "List"
          },
          {
            "maintext": "Header8",
            "subtext": "Text"
          },
          {
            "maintext": "Header9",
            "subtext": "Text"
          },
          {
            "maintext": "Header10",
            "subtext": "Text"
          },
          {
            "maintext": "Header11",
            "subtext": "Text"
          },
          {
            "maintext": "Header12",
            "subtext": "List"
          },
          {
            "maintext": "Header13",
            "subtext": "Text"
          },
          {
            "maintext": "Header14",
            "subtext": "Text"
          },
          {
            "maintext": "Header15",
            "subtext": "Text"
          },
          {
            "maintext": "Header16",
            "subtext": "Text"
          }
        ]
      },
      {
        "position": 6,
        "name": "Template 5",
        "weight": 12.0107,
        "symbol": "expand_more",
        "symbol2": "expand_less",
        "description": [
          {
            "maintext": "Header1",
            "subtext": "Text"
          },
          {
            "maintext": "Header2",
            "subtext": "List"
          },
          {
            "maintext": "Header3",
            "subtext": "Text"
          },
          {
            "maintext": "Header4",
            "subtext": "Text"
          },
          {
            "maintext": "Header5",
            "subtext": "Text"
          },
          {
            "maintext": "Header6",
            "subtext": "Text"
          },
          {
            "maintext": "Header7",
            "subtext": "List"
          },
          {
            "maintext": "Header8",
            "subtext": "Text"
          },
          {
            "maintext": "Header9",
            "subtext": "Text"
          },
          {
            "maintext": "Header10",
            "subtext": "Text"
          },
          {
            "maintext": "Header11",
            "subtext": "Text"
          },
          {
            "maintext": "Header12",
            "subtext": "List"
          },
          {
            "maintext": "Header13",
            "subtext": "Text"
          },
          {
            "maintext": "Header14",
            "subtext": "Text"
          },
          {
            "maintext": "Header15",
            "subtext": "Text"
          },
          {
            "maintext": "Header16",
            "subtext": "Text"
          }
        ]
      },
      {
        "position": 7,
        "name": "Template 6",
        "weight": 14.0067,
        "symbol": "expand_more",
        "symbol2": "expand_less",
        "description": [
          {
            "maintext": "Header1",
            "subtext": "Text"
          },
          {
            "maintext": "Header2",
            "subtext": "List"
          },
          {
            "maintext": "Header3",
            "subtext": "Text"
          },
          {
            "maintext": "Header4",
            "subtext": "Text"
          },
          {
            "maintext": "Header5",
            "subtext": "Text"
          },
          {
            "maintext": "Header6",
            "subtext": "Text"
          },
          {
            "maintext": "Header7",
            "subtext": "List"
          },
          {
            "maintext": "Header8",
            "subtext": "Text"
          },
          {
            "maintext": "Header9",
            "subtext": "Text"
          },
          {
            "maintext": "Header10",
            "subtext": "Text"
          },
          {
            "maintext": "Header11",
            "subtext": "Text"
          },
          {
            "maintext": "Header12",
            "subtext": "List"
          },
          {
            "maintext": "Header13",
            "subtext": "Text"
          },
          {
            "maintext": "Header14",
            "subtext": "Text"
          },
          {
            "maintext": "Header15",
            "subtext": "Text"
          },
          {
            "maintext": "Header16",
            "subtext": "Text"
          }
        ]
      },
      {
        "position": 8,
        "name": "Template 7",
        "weight": 15.9994,
        "symbol": "expand_more",
        "symbol2": "expand_less",
        "description": [
          {
            "maintext": "Header1",
            "subtext": "Text"
          },
          {
            "maintext": "Header2",
            "subtext": "List"
          },
          {
            "maintext": "Header3",
            "subtext": "Text"
          },
          {
            "maintext": "Header4",
            "subtext": "Text"
          },
          {
            "maintext": "Header5",
            "subtext": "Text"
          },
          {
            "maintext": "Header6",
            "subtext": "Text"
          },
          {
            "maintext": "Header7",
            "subtext": "List"
          },
          {
            "maintext": "Header8",
            "subtext": "Text"
          },
          {
            "maintext": "Header9",
            "subtext": "Text"
          },
          {
            "maintext": "Header10",
            "subtext": "Text"
          },
          {
            "maintext": "Header11",
            "subtext": "Text"
          },
          {
            "maintext": "Header12",
            "subtext": "List"
          },
          {
            "maintext": "Header13",
            "subtext": "Text"
          },
          {
            "maintext": "Header14",
            "subtext": "Text"
          },
          {
            "maintext": "Header15",
            "subtext": "Text"
          },
          {
            "maintext": "Header16",
            "subtext": "Text"
          }
        ]
      },
      {
        "position": 9,
        "name": "Template 8",
        "weight": 18.9984,
        "symbol": "expand_more",
        "symbol2": "expand_less",
        "description": [
          {
            "maintext": "Header1",
            "subtext": "Text"
          },
          {
            "maintext": "Header2",
            "subtext": "List"
          },
          {
            "maintext": "Header3",
            "subtext": "Text"
          },
          {
            "maintext": "Header4",
            "subtext": "Text"
          },
          {
            "maintext": "Header5",
            "subtext": "Text"
          },
          {
            "maintext": "Header6",
            "subtext": "Text"
          },
          {
            "maintext": "Header7",
            "subtext": "List"
          },
          {
            "maintext": "Header8",
            "subtext": "Text"
          },
          {
            "maintext": "Header9",
            "subtext": "Text"
          },
          {
            "maintext": "Header10",
            "subtext": "Text"
          },
          {
            "maintext": "Header11",
            "subtext": "Text"
          },
          {
            "maintext": "Header12",
            "subtext": "List"
          },
          {
            "maintext": "Header13",
            "subtext": "Text"
          },
          {
            "maintext": "Header14",
            "subtext": "Text"
          },
          {
            "maintext": "Header15",
            "subtext": "Text"
          },
          {
            "maintext": "Header16",
            "subtext": "Text"
          }
        ]
      },
      {
        "position": 10,
        "name": "Template 9",
        "weight": 20.1797,
        "symbol": "expand_more",
        "symbol2": "expand_less",
        "description": [
          {
            "maintext": "Header1",
            "subtext": "Text"
          },
          {
            "maintext": "Header2",
            "subtext": "List"
          },
          {
            "maintext": "Header3",
            "subtext": "Text"
          },
          {
            "maintext": "Header4",
            "subtext": "Text"
          },
          {
            "maintext": "Header5",
            "subtext": "Text"
          },
          {
            "maintext": "Header6",
            "subtext": "Text"
          },
          {
            "maintext": "Header7",
            "subtext": "List"
          },
          {
            "maintext": "Header8",
            "subtext": "Text"
          },
          {
            "maintext": "Header9",
            "subtext": "Text"
          },
          {
            "maintext": "Header10",
            "subtext": "Text"
          },
          {
            "maintext": "Header11",
            "subtext": "Text"
          },
          {
            "maintext": "Header12",
            "subtext": "List"
          },
          {
            "maintext": "Header13",
            "subtext": "Text"
          },
          {
            "maintext": "Header14",
            "subtext": "Text"
          },
          {
            "maintext": "Header15",
            "subtext": "Text"
          },
          {
            "maintext": "Header16",
            "subtext": "Text"
          }
        ]
      }
    ]
}



export var TlDataA1 = {

  "data": [
    {
      "position": 1,
      "name": "Hudson Group",
      "weight": 1.0079,
      "symbol": "keyboard_arrow_right",
      "children": [
        {
          "position": 1,
          "name": "Schoem,Hudson and Herzog",
          "weight": 4.0026,
          "symbol": "keyboard_arrow_right",
          "children": [
            {
              "position": 1,
              "name": "Cummerata-wilderman",
              "weight": 4.0026,
              "symbol": ""
            },
            {
              "position": 2,
              "name": "Harvey, Heathcote and Bergstrom",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 3,
              "name": "Hackett - Tromp",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 4,
              "name": "Rogahn LLC",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 5,
              "name": "Stiedemann, Reynolds and Grady",
              "weight": 6.941,
              "symbol": ""
            }
          ]
        },
        {
          "position": 2,
          "name": "Wyman-Dickison",
          "weight": 6.941,
          "symbol": "keyboard_arrow_right",
          "children": [
            {
              "position": 1,
              "name": "Cummerata-wilderman",
              "weight": 4.0026,
              "symbol": ""
            },
            {
              "position": 2,
              "name": "Harvey, Heathcote and Bergstrom",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 3,
              "name": "Hackett - Tromp",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 4,
              "name": "Rogahn LLC",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 5,
              "name": "Stiedemann, Reynolds and Grady",
              "weight": 6.941,
              "symbol": ""
            }
          ]
        },
        {
          "position": 3,
          "name": "Hoeger Group",
          "weight": 4.0026,
          "symbol": "keyboard_arrow_right",
          "children": [
            {
              "position": 1,
              "name": "Cummerata-wilderman",
              "weight": 4.0026,
              "symbol": ""
            },
            {
              "position": 2,
              "name": "Harvey, Heathcote and Bergstrom",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 3,
              "name": "Hackett - Tromp",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 4,
              "name": "Rogahn LLC",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 5,
              "name": "Stiedemann, Reynolds and Grady",
              "weight": 6.941,
              "symbol": ""
            }
          ]
        },
        {
          "position": 4,
          "name": "Harvey Halvorson",
          "weight": 4.0026,
          "symbol": "keyboard_arrow_right",
          "children": [
            {
              "position": 1,
              "name": "Considine-Hammes",
              "weight": 4.0026,
              "symbol": ""
            },
            {
              "position": 2,
              "name": "Erdman Inc",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 3,
              "name": "Erdman Inc",
              "weight": 6.941,
              "symbol": ""
            }
          ]
        },
        {
          "position": 5,
          "name": "Ritchie-Goodwin",
          "weight": 4.0026,
          "symbol": "keyboard_arrow_right",
          "children": [
            {
              "position": 1,
              "name": "Cummerata-wilderman",
              "weight": 4.0026,
              "symbol": ""
            },
            {
              "position": 2,
              "name": "Harvey, Heathcote and Bergstrom",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 3,
              "name": "Hackett - Tromp",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 4,
              "name": "Rogahn LLC",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 5,
              "name": "Stiedemann, Reynolds and Grady",
              "weight": 6.941,
              "symbol": ""
            }
          ]
        },
      ]
    },
    {
      "position": 2,
      "name": "Considine - Hammes",
      "weight": 1.0079,
      "symbol": "keyboard_arrow_right",
      "children": [
        {
          "position": 1,
          "name": "Schoem,Hudson and Herzog",
          "weight": 4.0026,
          "symbol": "keyboard_arrow_right",
          "children": [
            {
              "position": 1,
              "name": "Cummerata-wilderman",
              "weight": 4.0026,
              "symbol": ""
            },
            {
              "position": 2,
              "name": "Harvey, Heathcote and Bergstrom",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 3,
              "name": "Hackett - Tromp",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 4,
              "name": "Rogahn LLC",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 5,
              "name": "Stiedemann, Reynolds and Grady",
              "weight": 6.941,
              "symbol": ""
            }
          ]
        },
        {
          "position": 2,
          "name": "Wyman-Dickison",
          "weight": 6.941,
          "symbol": "keyboard_arrow_right",
          "children": [
            {
              "position": 1,
              "name": "Cummerata-wilderman",
              "weight": 4.0026,
              "symbol": ""
            },
            {
              "position": 2,
              "name": "Harvey, Heathcote and Bergstrom",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 3,
              "name": "Hackett - Tromp",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 4,
              "name": "Rogahn LLC",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 5,
              "name": "Stiedemann, Reynolds and Grady",
              "weight": 6.941,
              "symbol": ""
            }
          ]
        },
        {
          "position": 3,
          "name": "Hoeger Group",
          "weight": 4.0026,
          "symbol": "keyboard_arrow_right",
          "children": [
            {
              "position": 1,
              "name": "Cummerata-wilderman",
              "weight": 4.0026,
              "symbol": ""
            },
            {
              "position": 2,
              "name": "Harvey, Heathcote and Bergstrom",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 3,
              "name": "Hackett - Tromp",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 4,
              "name": "Rogahn LLC",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 5,
              "name": "Stiedemann, Reynolds and Grady",
              "weight": 6.941,
              "symbol": ""
            }
          ]
        },
        {
          "position": 4,
          "name": "Harvey Halvorson",
          "weight": 4.0026,
          "symbol": "keyboard_arrow_right",
          "children": [
            {
              "position": 1,
              "name": "Considine-Hammes",
              "weight": 4.0026,
              "symbol": ""
            },
            {
              "position": 2,
              "name": "Erdman Inc",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 3,
              "name": "Erdman Inc",
              "weight": 6.941,
              "symbol": ""
            }
          ]
        },
        {
          "position": 5,
          "name": "Ritchie-Goodwin",
          "weight": 4.0026,
          "symbol": "keyboard_arrow_right",
          "children": [
            {
              "position": 1,
              "name": "Cummerata-wilderman",
              "weight": 4.0026,
              "symbol": ""
            },
            {
              "position": 2,
              "name": "Harvey, Heathcote and Bergstrom",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 3,
              "name": "Hackett - Tromp",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 4,
              "name": "Rogahn LLC",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 5,
              "name": "Stiedemann, Reynolds and Grady",
              "weight": 6.941,
              "symbol": ""
            }
          ]
        },
      ]
    },

    {
      "position": 3,
      "name": "Kuvalis, Swaniawski and Hintz",
      "weight": 1.0079,
      "symbol": "keyboard_arrow_right",
      "children": [
        {
          "position": 1,
          "name": "Schoem,Hudson and Herzog",
          "weight": 4.0026,
          "symbol": "keyboard_arrow_right",
          "children": [
            {
              "position": 1,
              "name": "Cummerata-wilderman",
              "weight": 4.0026,
              "symbol": ""
            },
            {
              "position": 2,
              "name": "Harvey, Heathcote and Bergstrom",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 3,
              "name": "Hackett - Tromp",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 4,
              "name": "Rogahn LLC",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 5,
              "name": "Stiedemann, Reynolds and Grady",
              "weight": 6.941,
              "symbol": ""
            }
          ]
        },
        {
          "position": 2,
          "name": "Wyman-Dickison",
          "weight": 6.941,
          "symbol": "keyboard_arrow_right",
          "children": [
            {
              "position": 1,
              "name": "Cummerata-wilderman",
              "weight": 4.0026,
              "symbol": ""
            },
            {
              "position": 2,
              "name": "Harvey, Heathcote and Bergstrom",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 3,
              "name": "Hackett - Tromp",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 4,
              "name": "Rogahn LLC",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 5,
              "name": "Stiedemann, Reynolds and Grady",
              "weight": 6.941,
              "symbol": ""
            }
          ]
        },
        {
          "position": 3,
          "name": "Hoeger Group",
          "weight": 4.0026,
          "symbol": "keyboard_arrow_right",
          "children": [
            {
              "position": 1,
              "name": "Cummerata-wilderman",
              "weight": 4.0026,
              "symbol": ""
            },
            {
              "position": 2,
              "name": "Harvey, Heathcote and Bergstrom",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 3,
              "name": "Hackett - Tromp",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 4,
              "name": "Rogahn LLC",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 5,
              "name": "Stiedemann, Reynolds and Grady",
              "weight": 6.941,
              "symbol": ""
            }
          ]
        },
        {
          "position": 4,
          "name": "Harvey Halvorson",
          "weight": 4.0026,
          "symbol": "keyboard_arrow_right",
          "children": [
            {
              "position": 1,
              "name": "Considine-Hammes",
              "weight": 4.0026,
              "symbol": ""
            },
            {
              "position": 2,
              "name": "Erdman Inc",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 3,
              "name": "Erdman Inc",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 4,
              "name": "Erdman Inc",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 5,
              "name": "Erdman Inc",
              "weight": 6.941,
              "symbol": ""
            }
          ]
        },
        {
          "position": 5,
          "name": "Ritchie-Goodwin",
          "weight": 4.0026,
          "symbol": "keyboard_arrow_right",
          "children": [
            {
              "position": 1,
              "name": "Cummerata-wilderman",
              "weight": 4.0026,
              "symbol": ""
            },
            {
              "position": 2,
              "name": "Harvey, Heathcote and Bergstrom",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 3,
              "name": "Hackett - Tromp",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 4,
              "name": "Rogahn LLC",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 5,
              "name": "Stiedemann, Reynolds and Grady",
              "weight": 6.941,
              "symbol": ""
            }
          ]
        },
      ]
    },

    {
      "position": 4,
      "name": "Erdman Inc",
      "weight": 1.0079,
      "symbol": "keyboard_arrow_right",
      "children": [
        {
          "position": 1,
          "name": "Schoem,Hudson and Herzog",
          "weight": 4.0026,
          "symbol": "keyboard_arrow_right",
          "children": [
            {
              "position": 1,
              "name": "Cummerata-wilderman",
              "weight": 4.0026,
              "symbol": ""
            },
            {
              "position": 2,
              "name": "Harvey, Heathcote and Bergstrom",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 3,
              "name": "Hackett - Tromp",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 4,
              "name": "Rogahn LLC",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 5,
              "name": "Stiedemann, Reynolds and Grady",
              "weight": 6.941,
              "symbol": ""
            }
          ]
        },
        {
          "position": 2,
          "name": "Wyman-Dickison",
          "weight": 6.941,
          "symbol": "keyboard_arrow_right",
          "children": [
            {
              "position": 1,
              "name": "Cummerata-wilderman",
              "weight": 4.0026,
              "symbol": ""
            },
            {
              "position": 2,
              "name": "Harvey, Heathcote and Bergstrom",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 3,
              "name": "Hackett - Tromp",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 4,
              "name": "Rogahn LLC",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 5,
              "name": "Stiedemann, Reynolds and Grady",
              "weight": 6.941,
              "symbol": ""
            }
          ]
        },
        {
          "position": 3,
          "name": "Hoeger Group",
          "weight": 4.0026,
          "symbol": "keyboard_arrow_right",
          "children": [
            {
              "position": 1,
              "name": "Cummerata-wilderman",
              "weight": 4.0026,
              "symbol": ""
            },
            {
              "position": 2,
              "name": "Harvey, Heathcote and Bergstrom",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 3,
              "name": "Hackett - Tromp",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 4,
              "name": "Rogahn LLC",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 5,
              "name": "Stiedemann, Reynolds and Grady",
              "weight": 6.941,
              "symbol": ""
            }
          ]
        },
        {
          "position": 4,
          "name": "Harvey Halvorson",
          "weight": 4.0026,
          "symbol": "keyboard_arrow_right",
          "children": [
            {
              "position": 1,
              "name": "Considine-Hammes",
              "weight": 4.0026,
              "symbol": ""
            },
            {
              "position": 2,
              "name": "Erdman Inc",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 3,
              "name": "Erdman Inc",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 4,
              "name": "Erdman Inc",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 5,
              "name": "Erdman Inc",
              "weight": 6.941,
              "symbol": ""
            }
          ]
        },
        {
          "position": 5,
          "name": "Ritchie-Goodwin",
          "weight": 4.0026,
          "symbol": "keyboard_arrow_right",
          "children": [
            {
              "position": 1,
              "name": "Cummerata-wilderman",
              "weight": 4.0026,
              "symbol": ""
            },
            {
              "position": 2,
              "name": "Harvey, Heathcote and Bergstrom",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 3,
              "name": "Hackett - Tromp",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 4,
              "name": "Rogahn LLC",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 5,
              "name": "Stiedemann, Reynolds and Grady",
              "weight": 6.941,
              "symbol": ""
            }
          ]
        },
      ]
    },
    {
      "position": 5,
      "name": "Lehner - Herman",
      "weight": 1.0079,
      "symbol": "keyboard_arrow_right",
      "children": [
        {
          "position": 1,
          "name": "Schoem,Hudson and Herzog",
          "weight": 4.0026,
          "symbol": "keyboard_arrow_right",
          "children": [
            {
              "position": 1,
              "name": "Cummerata-wilderman",
              "weight": 4.0026,
              "symbol": ""
            },
            {
              "position": 2,
              "name": "Harvey, Heathcote and Bergstrom",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 3,
              "name": "Hackett - Tromp",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 4,
              "name": "Rogahn LLC",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 5,
              "name": "Stiedemann, Reynolds and Grady",
              "weight": 6.941,
              "symbol": ""
            }
          ]
        },
        {
          "position": 2,
          "name": "Wyman-Dickison",
          "weight": 6.941,
          "symbol": "keyboard_arrow_right",
          "children": [
            {
              "position": 1,
              "name": "Cummerata-wilderman",
              "weight": 4.0026,
              "symbol": ""
            },
            {
              "position": 2,
              "name": "Harvey, Heathcote and Bergstrom",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 3,
              "name": "Hackett - Tromp",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 4,
              "name": "Rogahn LLC",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 5,
              "name": "Stiedemann, Reynolds and Grady",
              "weight": 6.941,
              "symbol": ""
            }
          ]
        },
        {
          "position": 3,
          "name": "Hoeger Group",
          "weight": 4.0026,
          "symbol": "keyboard_arrow_right",
          "children": [
            {
              "position": 1,
              "name": "Cummerata-wilderman",
              "weight": 4.0026,
              "symbol": ""
            },
            {
              "position": 2,
              "name": "Harvey, Heathcote and Bergstrom",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 3,
              "name": "Hackett - Tromp",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 4,
              "name": "Rogahn LLC",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 5,
              "name": "Stiedemann, Reynolds and Grady",
              "weight": 6.941,
              "symbol": ""
            }
          ]
        },
        {
          "position": 4,
          "name": "Harvey Halvorson",
          "weight": 4.0026,
          "symbol": "keyboard_arrow_right",
          "children": [
            {
              "position": 1,
              "name": "Considine-Hammes",
              "weight": 4.0026,
              "symbol": ""
            },
            {
              "position": 2,
              "name": "Erdman Inc",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 3,
              "name": "Erdman Inc",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 4,
              "name": "Erdman Inc",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 5,
              "name": "Erdman Inc",
              "weight": 6.941,
              "symbol": ""
            }
          ]
        },
        {
          "position": 5,
          "name": "Ritchie-Goodwin",
          "weight": 4.0026,
          "symbol": "keyboard_arrow_right",
          "children": [
            {
              "position": 1,
              "name": "Cummerata-wilderman",
              "weight": 4.0026,
              "symbol": ""
            },
            {
              "position": 2,
              "name": "Harvey, Heathcote and Bergstrom",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 3,
              "name": "Hackett - Tromp",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 4,
              "name": "Rogahn LLC",
              "weight": 6.941,
              "symbol": ""
            },
            {
              "position": 5,
              "name": "Stiedemann, Reynolds and Grady",
              "weight": 6.941,
              "symbol": ""
            }
          ]
        },
      ]
    }


  ]
};

