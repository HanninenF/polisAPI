import { AllTypes } from "./Root2";
import { url } from "./main";
import { AllDomElements } from "./domElements";

//ta emot Events och datum och returnera alla Events från valt datum

export namespace AllFunctions {
  export const getEventsByDate = async (
    date: string
  ): Promise<AllTypes.Event[]> => {
    const response = await fetch(url);
    const events: AllTypes.Event[] = await response.json();
    const eventsByDate: AllTypes.Event[] = [];

    events.forEach((event) => {
      if (event.datetime.includes(date)) {
        eventsByDate.push(event);
      }
    });

    return eventsByDate;
  };

  export const getSortedStrings = (stringInput: string[]): string[] => {
    const sortedStrings: string[] = stringInput.sort();

    return sortedStrings;
  };

  export function asConst<T extends readonly string[]>(array: T): Readonly<T> {
    return array;
  }

  export const eventsByDateRender = (event: AllTypes.Event) => {
    const liElementRender = document.createElement("li") as HTMLLIElement;
    liElementRender.classList.add("liElementRender");
    liElementRender.textContent = `${event.name}\n${event.location.gps}\n${event.type}\n${event.summary}`;
    AllDomElements.eventDataUlElement.appendChild(liElementRender);
  };
}
