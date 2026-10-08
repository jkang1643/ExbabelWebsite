import { z } from 'zod';

const webUrl=z.string().url().max(500).refine(v=>/^https?:\/\//i.test(v),'URL must use HTTP or HTTPS');
export const ProspectSchema=z.object({
  firstName:z.string().trim().max(80).optional(),
  churchName:z.string().trim().min(2).max(100),
  city:z.string().trim().max(80).optional(),
  state:z.string().trim().max(50).optional(),
  size:z.number().int().positive().max(1000000).optional(),
  phone:z.string().trim().max(32).optional(),
  website:webUrl.optional(),
  email:z.string().email().max(254).optional(),
});

// V1 deliberately exposes one and only one prospect-derived visual value.
export const PublicConfigSchema=z.object({
  churchName:z.string().trim().min(2).max(100),
}).strict();

export const DemoRecordSchema=z.object({
  id:z.string().uuid(),
  publicToken:z.string().regex(/^[A-Za-z0-9_-]{10,32}$/),
  salesforceId:z.string().regex(/^(00Q|003)[A-Za-z0-9]{12}([A-Za-z0-9]{3})?$/).optional(),
  prospect:ProspectSchema,
  pronunciation:z.object({churchName:z.string().trim().min(1).max(140)}).optional(),
  status:z.enum(['pending','generating','ready','voice_review_required','voice_unavailable','failed','disabled']),
  voiceCacheKey:z.string().optional(),
  audioPath:z.string().optional(),
  error:z.string().optional(),
});
export type Prospect=z.infer<typeof ProspectSchema>;
export type DemoRecord=z.infer<typeof DemoRecordSchema>;
export type PublicConfig=z.infer<typeof PublicConfigSchema>;

export function publicConfig(record:DemoRecord):PublicConfig {
  return PublicConfigSchema.parse({churchName:record.prospect.churchName});
}
