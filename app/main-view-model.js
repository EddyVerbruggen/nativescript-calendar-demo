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
        location: 'At home, cal Eddy',
        notes: 'Don\'t forget to shoot the rabbit',
        url: 'http://rabbits.telerik.com',
        calendar: {
            // id: 2,
            // if it doesn't exist we create it
            name: "{N} Cal 5",
            // color: "#FF0000" // not used right now
        },
        reminders: {
            first: 30,
            second: 10
        },
        recurrence: {
            frequency: Calendar.RecurrenceFrequency.DAILY,
            interval: 2, // every other day
            endDate: new Date(new Date().getTime() + (10*24*60*60*1000))
        },
        startDate: new Date(new Date().getTime() + (1*60*60*1000)),
        endDate: new Date(new Date().getTime() + (2*60*60*1000))
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
            title: events.length > 1 ? "Showing last event of " + events.length + " in total" : "findEvents result",
            message: JSON.stringify(events.length > 1 ? events[events.length - 1] : events),
            okButtonText: "OK, thanks"
          })
        },
        function(error) {
          console.log("doFindEvents error: " + error);
        }
    )
  };

  DemoAppModel.prototype.doListCalendars = function () {
    Calendar.listCalendars().then(
        function(calendars) {
          dialogs.alert({
            title: "Found " + calendars.length + " calendars",
            message: JSON.stringify(calendars),
            okButtonText: "OK, sweet"
          })
        },
        function(error) {
          console.log("doListCalendars error: " + error);
        }
    )
  };

  DemoAppModel.prototype.doDeleteEvents = function () {
    Calendar.deleteEvents({
        title: 'dinner',
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
