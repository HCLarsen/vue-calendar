# Vue Calendar

A series of simple calendar based components for Vue.js projects.

## Usage

There are two ways to use this library. First, is using the individual YearView, MonthView, and DayView. Second, is to use the CalendarView component, which allows navigating to specific dates using the router. Using this component requires VueRouter being included in the project.

### Colours and Fonts

The default setting for all components is to inherit the colour, border colour, and background colour from the parent element. This makes it easy to set a colour theme throughout a calendar. These settings are set using only CSS class selectors. To override them, a developer simply needs to use a more specific CSS selector, such as the element type and class. For example, to set the background of each day of this month in a MonthView:

```
li.day {
  background-color: red;
}
```

Fonts aren't set in the components, leaving them fully flexible for the developer to choose.

## To Do

* Portrait mode styles
* Add events display
* Accessibility

## Contributions

There are still many features to be added, including I18N and accessibility. Contributions to those fields, as well as feedback on suggested features, are always welcome.
