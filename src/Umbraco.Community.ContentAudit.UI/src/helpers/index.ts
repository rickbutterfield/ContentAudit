import { IssueLabelConfig } from "../interfaces";

export const IssueTypeConfigMap: Array<IssueLabelConfig> = [
    {
        label: 'Opportunity',
        icon: 'icon-info',
        class: 'opportunity',
        color: 'default'
    },
    {
        label: 'Warning',
        icon: 'icon-stop-alt',
        class: 'warning',
        color: 'warning'
    },
    {
        label: 'Issue',
        icon: 'icon-alert',
        class: 'issue',
        color: 'danger'
    }
]

export const IssuePriorityConfigMap: Array<IssueLabelConfig> = [
    {
        label: 'Low',
        icon: 'icon-navigation-bottom',
        class: 'low',
        color: 'default'
    },
    {
        label: 'Medium',
        icon: 'icon-navigation-road',
        class: 'medium',
        color: 'warning'
    },
    {
        label: 'High',
        icon: 'icon-navigation-top',
        class: 'high',
        color: 'danger'
    }
];