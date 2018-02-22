/**
 * Parses the given data for Summary Chart
 * @function parse
 * @param SummaryParser {Array}
 */
export function SummaryParser (data) {
    const categories = data.reduce((acc, log) => {
        const category = log.Category;
        const errEntry = category === 'undefined';

        if (!errEntry) {
            const exists = acc[category];

            if (exists) {
                const yAvgMessages = exists.yAvgMessages;
                const yAvgResponseTime = exists.yAvgResponseTime;
                const yAvgSentiments = exists.yAvgSentiments;

                acc[category] = {
                    yAvgMessages: yAvgMessages.concat(yAvgMessages),
                    yAvgResponseTime: yAvgResponseTime.concat(yAvgResponseTime),
                    yAvgSentiments: yAvgSentiments.concat(yAvgSentiments)
                };
            } else {
                acc[category] = {
                    yAvgMessages: [log.NumMessages],
                    yAvgResponseTime: [log.AvgResponseTime],
                    yAvgSentiments: [log.Sentiment]
                };
            }
        }

        return acc;
    }, {});

    return Object.keys(categories)
        .map(category => {
            function average (allValues) {
                const aggr = allValues.reduce((a, b) => parseFloat(a) + parseFloat(b));

                return aggr / allValues.length;
            }

            const oCategory = categories[category];

            const messages = oCategory.yAvgMessages;
            const yAvgMessages = average(messages);

            const responseTimes = oCategory.yAvgResponseTime;
            const yAvgResponseTime = average(responseTimes);

            const sentiments = oCategory.yAvgSentiments;
            const yAvgSentiments = average(sentiments);

            return {
                xAxisCategories: category,
                yAvgMessages: yAvgMessages,
                yAvgResponseTime: yAvgResponseTime,
                yAvgSentiments: yAvgSentiments
            };
        })
        .reduce((acc, record) => {
            return {
                xAxisCategories: acc.xAxisCategories.concat(record.xAxisCategories),
                yAvgMessages: acc.yAvgMessages.concat(record.yAvgMessages),
                yAvgResponseTime: acc.yAvgResponseTime.concat(record.yAvgResponseTime),
                yAvgSentiments: acc.yAvgSentiments.concat(record.yAvgSentiments)
            };
        }, {
            xAxisCategories: [],
            yAvgMessages: [],
            yAvgResponseTime: [],
            yAvgSentiments: []
        });
}
