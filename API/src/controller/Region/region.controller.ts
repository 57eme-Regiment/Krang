import { IRegionService } from '@/service/region/region.service.interface';
import {
  CreateRegion,
  RegionParams,
  UpdateRegion,
} from '@57em-regiment/krang-api-contract';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';

@injectable()
export class RegionController {
  constructor(
    @inject('IRegionService')
    private readonly regionService: IRegionService,
  ) {}

  async getAll(_req: FastifyRequest, reply: FastifyReply) {
    const regions = await this.regionService.getAll();
    return reply.send(regions);
  }

  async getById(
    req: FastifyRequest<{ Params: RegionParams }>,
    reply: FastifyReply,
  ) {
    const region = await this.regionService.getById(req.params.id);
    return reply.send(region);
  }

  async create(
    req: FastifyRequest<{ Body: CreateRegion }>,
    reply: FastifyReply,
  ) {
    const region = await this.regionService.create(req.body);
    return reply.status(201).send(region);
  }
  async createRange(
    req: FastifyRequest<{ Body: CreateRegion[] }>,
    reply: FastifyReply,
  ) {
    const regions = await this.regionService.createRange(req.body);
    return reply.status(201).send(regions);
  }

  async upsert(
    req: FastifyRequest<{ Body: CreateRegion }>,
    reply: FastifyReply,
  ) {
    const region = await this.regionService.upsert(req.body);
    return reply.send(region);
  }

  async update(
    req: FastifyRequest<{ Params: RegionParams; Body: UpdateRegion }>,
    reply: FastifyReply,
  ) {
    const region = await this.regionService.update(req.params.id, req.body);
    return reply.send(region);
  }

  async delete(
    req: FastifyRequest<{ Params: RegionParams }>,
    reply: FastifyReply,
  ) {
    await this.regionService.delete(req.params.id);
    return reply.status(204).send();
  }
}
