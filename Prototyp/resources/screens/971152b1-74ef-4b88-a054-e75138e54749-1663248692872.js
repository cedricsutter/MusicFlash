jQuery("#simulation")
  .on("click", ".s-971152b1-74ef-4b88-a054-e75138e54749 .click", function(event, data) {
    var jEvent, jFirer, cases;
    if(jimUtil.isAlternateModeActive()) return;
    if(data === undefined) { data = event; }
    jEvent = jimEvent(event);
    jFirer = jEvent.getEventFirer();
    if(jFirer.is("#s-Image_4")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/40e4b202-41e1-4e01-9048-65637e4e6779"
                  },
                  "exectype": "serial",
                  "delay": 0
                }
              ]
            }
          ],
          "exectype": "serial",
          "delay": 0
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    } else if(jFirer.is("#s-Button_1")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimHide",
                  "parameter": {
                    "target": [ "#s-Path_32","#s-Rectangle_39","#s-Image_2","#s-Paragraph_11","#s-Paragraph_2","#s-Image_15","#s-Path_16","#s-Image_1","#s-Paragraph_1","#s-Paragraph_36","#s-Paragraph_35","#s-Button_1","#s-Paragraph_32" ]
                  },
                  "exectype": "serial",
                  "delay": 0
                }
              ]
            }
          ],
          "exectype": "serial",
          "delay": 0
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    } else if(jFirer.is("#s-Button_2")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimHide",
                  "parameter": {
                    "target": [ "#s-Path_2","#s-Paragraph_14","#s-Path_1","#s-Image_7","#s-Paragraph_12","#s-Image_8","#s-Image_6","#s-Paragraph_8","#s-Paragraph_13","#s-Button_2","#s-Paragraph_9","#s-Paragraph_10","#s-Rectangle_1" ]
                  },
                  "exectype": "serial",
                  "delay": 0
                }
              ]
            }
          ],
          "exectype": "serial",
          "delay": 0
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    }
  });