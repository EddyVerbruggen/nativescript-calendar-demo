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
        title: 'Christmas dinner',
        location: 'At home',
        notes: 'Don\'t forget to shoot the rabbit',
        url: 'http://rabbits.telerik.com',
        calendar: {
            // if it doesn't exist we create it
            name: "{N} Calendar",
            color: "#FF0000" // not used right now
        },
        // TODO reminders
        startDate: new Date(new Date().getTime() + (24*60*60*1000)),
        endDate: new Date(new Date().getTime() + (27*60*60*1000))
    }).then(
        function(createdId) {
          dialogs.alert({
            title: "Event created with ID",
            message: JSON.stringify(createdId),
            okButtonText: "OK, nice!"
          })
        },
        function(error) {
          console.log("doCreateEvent error: " + error);
        }
    )
  };

  DemoAppModel.prototype.doFindEvents = function () {
    Calendar.findEvents({
      title: 'Christ',
      startDate: new Date(new Date().getTime() - (7*24*60*60*1000)),
      endDate: new Date(new Date().getTime() + (3*24*60*60*1000))
    }).then(
        function(events) {
          dialogs.alert({
            title: events.length > 1 ? "Showing event 1 of " + events.length : "findEvents result",
            message: JSON.stringify(events.length > 1 ? events[0] : events),
            okButtonText: "OK, thanks"
          })
        },
        function(error) {
          console.log("doFindEvents error: " + error);
        }
    )
  };

  DemoAppModel.prototype.doDeleteEvents = function () {
    Calendar.deleteEvents({
        title: 'ice',
        startDate: new Date(new Date().getTime() - (8*24*60*60*1000)),
        endDate: new Date(new Date().getTime() + (3*60*60*1000))
    }).then(
        function(deletedEventIds) {
          dialogs.alert({
            title: "Deleted events ID\'s",
            message: JSON.stringify(deletedEventIds),
            okButtonText: "Awesome"
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
