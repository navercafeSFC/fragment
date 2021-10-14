sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, JSONModel) {
		"use strict";

		return Controller.extend("com.sfc.fragments.controller.App", {
			onInit: function () {
                var oJSONModel =  new JSONModel({ 
                    "PeopleCollection" : {                        
                        "name" : "Neo",
                        "sex" : "M",   
                        "role" : "Admin",
                        "site" : "https://cafe.naver.com/sapux",
                        "location" : "Korea",
                        "email" : "sapfioricafe@naver.com",                                                
                        "birthday" : "04.19"
                    },
                    "RoleCollection" : {
                        "UserRole" : [
                        {
                            "key" : "Admin",
                            "text" : "Admin"
                        },
                        {
                            "key" : "User",
                            "text" : "User"
                        }
                    ]}
                });
                //Default bindingMode = JSONModel TwoWay
                oJSONModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);

                this.setModel(oJSONModel);   

                this.getView().bindElement("/PeopleCollection");                
            },

            /** Button Action */
            onButtonFragmentPress : function (buttonName) {
                console.log("ButtonFragmentButtonName :" + buttonName);
            },

            onbuttonModifyPress : function(){                
                this._handleOpenDialogPersonal();
            },

            onbuttonConfirmPress : function(){

                // /**                  
                //  * personalFragmentRadiobuttongroupSex
                //  * personalFragmentComboBoxUserRole
                //  * personalFragmentInputSite
                //  * personalFragmentInputLocation
                //  * personalFragmentInputEmail
                //  */

                var personalFragmentInputEmail = this.byId(sap.ui.core.Fragment.createId(this.createId("personal"), "personalFragmentInputEmail"));
                alert("personalFragmentInputEmail : "+ personalFragmentInputEmail.getValue());

                this._handleCloseDialogPersonal();
                this.getModel().refresh(true);

            },

            /** private handle */
            _handleOpenDialogPersonal: function () {
                var oView = this.getView();

                if(!this.byId("dialogPersonalFragment"))
                {
                    this._oDialog = this.loadFragment({
                        name: "com.sfc.fragments.view.DialogPersonal",
                        type: "XML",
                        id: this.createId("personal")
                    }).then(function(oDialog) {                   
                        oView.addDependent(oDialog);
                        return oDialog;
                    }.bind(this));
                }

                this._oDialog.then(function(oDialog) {
                    oDialog.open();
                });
            },

            _handleCloseDialogPersonal: function () {
                //this.createId("personal")
                //var oDialogPersonalFragment = this.byId("dialogPersonalFragment");
                var oDialogPersonalFragment = this.byId(sap.ui.core.Fragment.createId(this.createId("personal"), "dialogPersonalFragment"));
                oDialogPersonalFragment.close();
                oDialogPersonalFragment.destroy();
            },            
            
            getModel : function (sName) {
              return this.getView().getModel(sName);
            },

            setModel : function (oModel, sName) {
                return this.getView().setModel(oModel, sName);
            }               
            
		});
	});
