import {
  createLocationSchema,
  locationParamsSchema,
  updateLocationSchema,
} from '@/models/location/location.schema';
import { ILocationService } from '@/service/location/location.service.interface';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';

@injectable()
export class LocationController {
  constructor(
    @inject('ILocationService')
    private readonly locationService: ILocationService,
  ) {}

  async getAll(_req: FastifyRequest, reply: FastifyReply) {
    const locations = await this.locationService.getAll();
    return reply.send(locations);
  }

  async getById(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    const { id } = locationParamsSchema.parse(req.params);
    const location = await this.locationService.getById(id);
    return reply.send(location);
  }

  async create(req: FastifyRequest, reply: FastifyReply) {
    const data = createLocationSchema.parse(req.body);
    const location = await this.locationService.create(data);
    return reply.status(201).send(location);
  }

  async update(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    const { id } = locationParamsSchema.parse(req.params);
    const data = updateLocationSchema.parse(req.body);
    const location = await this.locationService.update(id, data);
    return reply.send(location);
  }

  async delete(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    const { id } = locationParamsSchema.parse(req.params);
    await this.locationService.delete(id);
    return reply.status(204).send();
  }
}
