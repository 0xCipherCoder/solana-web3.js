/* eslint-disable @typescript-eslint/ban-ts-comment */

import { DataPublisher, getDataPublisherFromEventEmitter } from '../data-publisher';
import { TypedEventEmitter } from '../event-emitter';

type ChannelMap = {
    fall: null;
    jump: { height: number };
    run: { velocity: number };
};
const publisher = null as unknown as DataPublisher<ChannelMap>;

// [DESCRIBE] getDataPublisherFromEventEmitter
{
    // It materializes listener signatures based on the events of the emitter
    {
        const eventEmitter = null as unknown as TypedEventEmitter<{ foo: CustomEvent<'bar'> }>;
        const publisher = getDataPublisherFromEventEmitter(eventEmitter);
        publisher.on('foo', data => {
            data satisfies 'bar';
        });
    }
}

// [DESCRIBE] DataPublisher
{
    // It adds listeners for known types
    {
        publisher.on('fall', () => {});
        publisher.on('jump', () => {});
        publisher.on('run', () => {});
    }
    // It rejects adding listeners for unknown types
    {
        publisher.on(
            // @ts-expect-error
            'roll',
            () => {},
        );
    }
    // It accepts adding listeners with the appropriate signature
    {
        publisher.on('fall', data => {
            data satisfies null;
        });
        publisher.on('jump', data => {
            data satisfies { height: number };
        });
        publisher.on('run', data => {
            data satisfies { velocity: number };
        });
    }
    // It rejects adding listeners with inappropriate signatures
    {
        publisher.on('fall', data => {
            // @ts-expect-error
            data satisfies { style: string };
        });
    }
}
