var observable = require("tns-core-modules/data/observable");
var Calendar = require("nativescript-calendar");
var dialogs = require("tns-core-modules/ui/dialogs");
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
          });
        }
    );
  };

  DemoAppModel.prototype.doRequestPermission = function () {
    Calendar.requestPermission().then(
        function() {
          console.log("Permission requested");
        }
    );
  };

  DemoAppModel.prototype._createEvent = function (options) {
    Calendar.createEvent(options).then(
        function(createdId) {
          dialogs.alert({
            title: "Event created with ID",
            message: JSON.stringify(createdId),
            okButtonText: "OK, nice!"
          });
        },
        function(error) {
          console.log("doCreateEvent error: " + error);
        }
    );
  };

  DemoAppModel.prototype.doCreateEventWithReminders = function () {
      this._createEvent({
        // spans an hour
        title: 'Get groceries',
        location: 'The shop',
        notes: 'This event has reminders',
        url: 'http://my.shoppinglist.com',
        reminders: {
            first: 30,
            second: 10
        },
        startDate: new Date(new Date().getTime() + (1*60*60*1000)),
        endDate: new Date(new Date().getTime() + (2*60*60*1000))
    });
  };

  DemoAppModel.prototype.doCreateAllDayEvent = function () {
      var d = new Date();
      d.setHours(0);
      d.setMinutes(0);
      d.setSeconds(0);

      this._createEvent({
        title: 'Go back to the shop - forgot milk',
        location: 'The shop',
        notes: 'This event spans all day',
        url: 'http://my.shoppinglist.com',
        reminders: null,
        // this will make this event an 'all day event' for tomorrow
        startDate: new Date(d.getTime() + (24*60*60*1000)),
        endDate: new Date(d.getTime() + (2*24*60*60*1000))
    });
  };

  DemoAppModel.prototype.doCreateRepeatingEvent = function () {
      this._createEvent({
        title: 'Get groceries every other day',
        location: 'The shop',
        notes: 'This is a repeating event',
        url: 'http://my.shoppinglist.com',
        // repeat every other day for 10 days
        recurrence: {
            frequency: Calendar.RecurrenceFrequency.DAILY,
            interval: 2,
            endDate: new Date(new Date().getTime() + (10*24*60*60*1000)) // 10 days
        },
        startDate: new Date(new Date().getTime() + (1*60*60*1000)),
        endDate: new Date(new Date().getTime() + (2*60*60*1000))
    });
  };

  DemoAppModel.prototype.doCreateEventInCustomCalendar = function () {
      this._createEvent({
        title: 'Get groceries',
        location: 'The shop',
        notes: 'This event is in a custom calendar',
        url: 'http://my.shoppinglist.com',
        calendar: {
            // if it doesn't exist we create it
            name: "NativeScript Cal"
        },
        // spans 2 hours, starting in 3 hours
        startDate: new Date(new Date().getTime() + (3*60*60*1000)),
        endDate: new Date(new Date().getTime() + (5*60*60*1000))
    });
  };

  DemoAppModel.prototype.doFindEventByTitle = function () {
    Calendar.findEvents({
      // any event containing this string will be returned
      title: 'groceries',
      // dates are mandatory, the event must be within this interval
      startDate: new Date(new Date().getTime() - (7*24*60*60*1000)),
      endDate: new Date(new Date().getTime() + (3*24*60*60*1000))
    }).then(
        function(events) {
          dialogs.alert({
            title: events.length + " events match the title 'groceries'",
            message: JSON.stringify(events),
            okButtonText: "OK, thanks"
          });
        },
        function(error) {
          console.log("doFindEventByTitle error: " + error);
        }
    );
  };

  DemoAppModel.prototype.doFindAllEvents = function () {
    Calendar.findEvents({
      // dates are mandatory, the event must be within this interval
      startDate: new Date(new Date().getTime() - (50*24*60*60*1000)),
      endDate: new Date(new Date().getTime() + (50*24*60*60*1000))
    }).then(
        function(events) {
          dialogs.alert({
            title: events.length > 1 ? "Showing last event of " + events.length + " in total" : "findEvents result",
            message: JSON.stringify(events.length > 1 ? events[events.length - 1] : events),
            okButtonText: "OK, thanks"
          });
        },
        function(error) {
          dialogs.alert({
            title: "Error in findEvents",
            message: JSON.stringify(error),
            okButtonText: "OK, thanks"
          });
        }
    );
  };

  DemoAppModel.prototype.doListCalendars = function () {
    Calendar.listCalendars().then(
        function(calendars) {
          dialogs.alert({
            title: "Found " + calendars.length + " calendars",
            message: JSON.stringify(calendars),
            okButtonText: "OK, sweet"
          });
        },
        function(error) {
          console.log("doListCalendars error: " + error);
        }
    );
  };

  DemoAppModel.prototype.doDeleteEvents = function () {
    Calendar.deleteEvents({
        // id: 'EF33E6DE-D36E-473B-A50B-FEFAEF700031',
        title: 'groceries',
        startDate: new Date(new Date().getTime() - (7*24*60*60*1000)),
        endDate: new Date(new Date().getTime() + (3*24*60*60*1000))
    }).then(
        function(deletedEventIds) {
          dialogs.alert({
            title: "Deleted " + deletedEventIds.length + " 'groceries' event(s)",
            message: "ID's of deleted event(s)\n\n" + JSON.stringify(deletedEventIds),
            okButtonText: "Awesome"
          });
        },
        function(error) {
          console.log("doFindEvents error: " + error);
        }
    );
  };

  return DemoAppModel;
})(observable.Observable);
exports.DemoAppModel = DemoAppModel;
exports.mainViewModel = new DemoAppModel();
