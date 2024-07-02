sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
function (Controller,MessageToast) {
    "use strict";

    return Controller.extend("com.app.sampleui5.controller.UserView", {
        onInit: function () {

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
    });
});
