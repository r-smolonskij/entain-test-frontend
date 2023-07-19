
import { Sports } from "./models/Sports";
import { Status } from "./models/Status";

export const sportsTypesList: Sports[] = [
    { name: "Football", value: 'football' },
    { name: "Basketball", value: "basketball" },
    { name: "Ice Hockey", value: "hockey" },
    { name: "Tennis", value: "tennis" }
]

export const statusesTypesList: Status[] = [
    { name: "Inactive", value: "inactive" },
    { name: "Active", value: "active" },
    { name: "Finished", value: "finished" },
  ]