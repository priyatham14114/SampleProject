sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ushell/services/UserInfo"
],
function (Controller,MessageToast,UserInfo) {
    "use strict";

    return Controller.extend("com.app.sampleui5.controller.UserView", {
        onInit: function () {

            // var oUserInfoService = sap.ushell.Container.getService("UserInfo");
            var oUser = sap.ushell.Container.getUser();

            // Example: Get the full name of the user
            var sFullName = oUser.getFullName();

            // Example: Get the user ID
            var sUserId = oUser.getId();

            // Use the information as needed in your application
            console.log("Full Name: " + sFullName);
            console.log("User ID: " + sUserId);

            // Set the data to the view model (if needed)
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
