export default class Jenkins {
    static serialize(data) {
        let success = 0;
        let successResult = 'blue';
        const successStatuts = {
            'blue': 0,
            'blue_anime': 1,
            'yellow': 2,
            'yellow_anime': 3,
            'disabled': 4,
            'red_anime': 5,
            'red': 6
        };
        const correspondanceStatuts = {
            'blue': 'success',
            'blue_anime': 'success__pending',
            'yellow': 'warning',
            'yellow_anime': 'warning__pending',
            'disabled': 'disabled',
            'red_anime': 'failed__pending',
            'red': 'failed'
        };
        const values = {};

        data.jobs.forEach((job) => {
            if (successStatuts[job.color] > success) {
                success = successStatuts[job.color];
                successResult = job.color;
            }
            if (values[correspondanceStatuts[job.color]] !== undefined) {
                values[correspondanceStatuts[job.color]] += 1;
            } else {
                values[correspondanceStatuts[job.color]] = 1;
            }
            job.color = correspondanceStatuts[job.color];
        });

        successResult = correspondanceStatuts[successResult];

        return {
            name: data.name,
            url: data.url,
            description: 'description',
            status: successResult,
            child: data.jobs,
            values: values
        };
    }
}
