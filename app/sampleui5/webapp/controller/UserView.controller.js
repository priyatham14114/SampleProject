sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ushell/services/UserInfo"
],
function (Controller,MessageToast,UserInfo) {
    "use strict";

    return Controller.extend("com.app.sampleui5.controller.UserView", {
        onInit: async function () {

            // var oUserInfoService = sap.ushell.Container.getService("UserInfo"); // Get service is depricated
            // var oUser = oUserInfoService.getUser();

            var oUser, sFullName, sUserId;

            if (sap.ushell.Container) {
                try {
                    oUser = await sap.ushell.Container.getServiceAsync("UserInfo").then(function(UserInfoService) {
                        return UserInfoService.getUser();
                    });
                    sFullName = oUser.getFullName();
                    sUserId = oUser.getId();
                } catch (error) {
                    // console.error("Error fetching user information:", error);
                    MessageToast.show("Error fetching user information:", error)
                }
            } else {
                // Mock data for local testing
                sFullName = "Mock User";
                sUserId = "MockUser123";
            }

            // console.log("Full Name: " + sFullName);
            // console.log("User ID: " + sUserId);

            var oModel = new sap.ui.model.json.JSONModel({
                fullName: sFullName,
                userId: sUserId
            });
            this.getView().setModel(oModel, "userModel");
        },
        onDeleteBooks: function (oEvent) {
            debugger;
            var oSelected = this.byId("idBooksTable").getSelectedItem();
            if (oSelected) {
                var oBookName = oSelected.getBindingContext().getObject().title;

                oSelected.getBindingContext().delete("$auto").then(() => {

                    MessageToast.show(oBookName + " SuccessFully Deleted");

                },
                    (oError) => {
                        MessageToast.show("Deletion Error: ", oError);
                    });
                this.getView().byId("idBooksTable").getBinding("items").refresh();

            } else {
                MessageToast.show("Please Select a Book to Delete");
            }
        },
        onRefresh: function () {
            this.getView().byId("idBooksTable").getBinding("items").refresh()

        }
    });
});
