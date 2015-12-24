var observable = require("data/observable");
var Calendar = require("nativescript-calendar");
var dialogs = require("ui/dialogs");
var DemoAppModel = (function (_super) {
  __extends(DemoAppModel, _super);
  function DemoAppModel() {
    _super.call(this);
  }

  DemoAppModel.prototype.doCheckHasPermission = function () {
    Calendar.hasPermission().then(
        function(granted) {
          dialogs.alert({
            title: "Permission granted?",
            message: granted ? "YES" : "NO",
            okButtonText: "OK"
          })
        }
    )
  };

  DemoAppModel.prototype.doRequestPermission = function () {
    Calendar.requestPermission().then(
        function() {
          console.log("Permission requested");
        }
    )
  };

  DemoAppModel.prototype.doCreateEvent = function () {
    Calendar.createEvent({
        // spans an hour
        title: 'Nice event',
        startDate: new Date(new Date().getTime() + (60*60*1000)),
        endDate: new Date(new Date().getTime() + (2*60*60*1000))
    }).then(
        function(createdId) {
          console.log("Calendar event created with id: " + createdId);
        },
        function(error) {
          console.log("doCreateEvent error: " + error);
        }
    )
  };

  DemoAppModel.prototype.doFindEvents = function () {
    Calendar.findEvents({
      startDate: new Date(new Date().getTime() - (7*24*60*60*1000)),
      endDate: new Date(new Date().getTime() + (3*60*60*1000))
    }).then(
        function(events) {
          dialogs.alert({
            title: "Found these events",
            message: JSON.stringify(events),
            okButtonText: "OK, thanks"
          })
        },
        function(error) {
          console.log("doFindEvents error: " + error);
        }
    )
  };

  return DemoAppModel;
})(observable.Observable);
exports.DemoAppModel = DemoAppModel;
exports.mainViewModel = new DemoAppModel();
