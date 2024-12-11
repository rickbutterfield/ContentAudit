import { IssueLabelConfig } from "../interfaces";

export const IssueTypeConfigMap: Array<IssueLabelConfig> = [
    {
        label: 'Opportunity',
        icon: 'icon-info',
        class: 'opportunity'
    },
    {
        label: 'Warning',
        icon: 'icon-stop-alt',
        class: 'warning'
    },
    {
        label: 'Issue',
        icon: 'icon-alert',
        class: 'issue'
    }
]

export const IssuePriorityConfigMap: Array<IssueLabelConfig> = [
    {
        label: 'Low',
        icon: 'icon-navigation-bottom',
        class: 'low'
    },
    {
        label: 'Medium',
        icon: 'icon-navigation-road',
        class: 'medium'
    },
    {
        label: 'High',
        icon: 'icon-navigation-top',
        class: 'high'
    }
];