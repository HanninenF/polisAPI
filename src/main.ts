import { AllTypes } from "./Root2";
import { allowedEventTypes } from "./data";
import { AllowedEventTypes } from "./Root2";
import { AllDomElements } from "./domElements";
import { AllFunctions } from "./func";
import "./style.scss";

//jag får en array av objekt. Alla objekt är händelser
export const url: string = "https://polisen.se/api/events";

//funktionen tar emot t.ex trafikolycka som en sträng, och returnerar alla objekt som är av typen trafikolycka
const getEventByEventType = async (
  inputString: AllowedEventTypes
): Promise<AllTypes.Event[]> => {
  const response = await fetch(url);
  const events = (await response.json()) as AllTypes.Event[];

  const result: AllTypes.Event[] = [];
  events.forEach((event) => {
    if (event.type === inputString) {
      result.push(event);
    }
  });

  return result;
};

const eventByEventType = await getEventByEventType("Fylleri/LOB");
eventByEventType.forEach((event) => {
  console.log(event.name);
});

const eventsByDate = await AllFunctions.getEventsByDate("2025-01-01");
console.log(eventsByDate);

const eventInput = document.querySelector("#dateInput") as HTMLInputElement;
const getEventsByDateButton = document.querySelector(
  "#dateButton"
) as HTMLButtonElement;

const selectDropdown = document.querySelector("#drop") as HTMLSelectElement;

allowedEventTypes.forEach((type) => {
  const dropdownOptions = document.createElement("option") as HTMLOptionElement;
  dropdownOptions.value = type;
  dropdownOptions.textContent = type;
  selectDropdown.appendChild(dropdownOptions);
});

eventInput.addEventListener("change", (e) => {
  e.preventDefault();
  selectDropdown.value = "";
});

selectDropdown.addEventListener("change", (e) => {
  e.preventDefault();
  eventInput.value = "";
});

getEventsByDateButton.addEventListener("click", async (e) => {
  e.preventDefault();
  AllDomElements.eventDataUlElement.textContent = "";

  if (eventInput.value) {
    try {
      const eventsByDate = (await AllFunctions.getEventsByDate(
        eventInput.value
      )) as AllTypes.Event[];

      eventsByDate.forEach((event) => {
        AllFunctions.eventsByDateRender(event);
      });
      selectDropdown.value = "types";
    } catch (error) {
      console.error("Error fetching events:", error);
      const errorMessage = document.createElement("li") as HTMLLIElement;
      errorMessage.classList.add("liElementRender");
      errorMessage.textContent = "An error occurred while fetching events.";
      AllDomElements.eventDataUlElement.appendChild(errorMessage);
    }
  }

  if (eventInput.value === "" && selectDropdown.value) {
    try {
      const eventsByEventType = (await getEventByEventType(
        selectDropdown.value as AllowedEventTypes
      )) as AllTypes.Event[];

      eventsByEventType.forEach((event) => {
        AllFunctions.eventsByDateRender(event);
      });
    } catch (error) {}
  }
});
