import type {DocumentData} from "firebase/firestore";
import { derived, writable, type Writable } from "svelte/store";
import { localStorageStore } from "@skeletonlabs/skeleton";

function hasMatchingTag(tagList: string[], userTags: string[]) {
    if (tagList.length === 0) return true;
    const lowercaseTags = tagList.map((tag) => tag.toLowerCase());
    return lowercaseTags.some((tag) => userTags.includes(tag));
}

interface FilterData {
    name: string;
    tags: {teamTags: string[]; roleTags: string[]; termTags: string[];}
}
const filterDefaults: FilterData = {
    name: "",
    tags: {
        teamTags: [],
        roleTags: [],
        termTags: [],
    },
};
export const filterData: Writable<FilterData> = localStorageStore("filterData", filterDefaults);

export const teamData = writable<DocumentData[]>([]);
export const filteredTeamData = derived([teamData, filterData], ([$teamData, $filterData]) => $teamData.filter((user) => {
    const lowercaseUserName = user.username.toLowerCase();

    // Define userTags for each user here
    const userTags = user.tags.map(
        (tag: { text: string; id: number }) => tag.text.toLowerCase()
    );

    // Check if the username starts with the lowercaseName
    const nameMatches = lowercaseUserName.startsWith($filterData.name);

    // Check if team tags, role tags, and term tags match
    const hasMatchingTeamTag = hasMatchingTag(
        $filterData.tags.teamTags,
        userTags
    );
    const hasMatchingRoleTag = hasMatchingTag(
        $filterData.tags.roleTags,
        userTags
    );
    const hasMatchingTermTag = hasMatchingTag(
        $filterData.tags.termTags,
        userTags
    );

    return (
        nameMatches &&
        hasMatchingTeamTag &&
        hasMatchingRoleTag &&
        hasMatchingTermTag
    );
}))

export const resetFilters = () => {
    filterData.set(JSON.parse(JSON.stringify(filterDefaults)));
}