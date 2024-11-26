import { Ride } from '../../../src/common/types/ride.types'
import { MockContext, Context, createMockContext } from '../context'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
})

test('Should create a new Ride', async () => {
    const Ride: Ride = {
        origin: "Location A",
        date: new Date(),
        destination: "Location B",
        distance: 100,
        duration: "1h 30m",
        value: 200,
        driver_id: 1,
    };

    mockCtx.prisma.ride.create
});