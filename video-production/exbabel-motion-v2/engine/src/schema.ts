import { z } from 'zod';
const webUrl=z.string().url().max(500).refine(v=>/^https?:\/\//i.test(v),'URL must use HTTP or HTTPS');

export const ProspectSchema = z.object({
  firstName: z.string().trim().max(80).optional(),
  churchName: z.string().trim().min(2).max(100),
  city: z.string().trim().max(80).optional(),
  state: z.string().trim().max(50).optional(),
  size: z.number().int().positive().max(1000000).optional(),
  phone: z.string().trim().max(32).optional(),
  website: webUrl.optional(),
  email: z.string().email().max(254).optional(),
});
export const PublicContentSchema = z.object({
  introGreeting: z.string().trim().min(1).max(140),
  introChurchName: z.string().trim().min(2).max(100),
  locationText: z.string().trim().max(140).optional(),
  customSceneText: z.object({
    S04: z.string().trim().max(65).optional(),
    S12: z.string().trim().max(65).optional(),
  }).strict().default({}),
});
export const PublicConfigSchema = z.object({
  id: z.string().regex(/^[A-Za-z0-9_-]{10,32}$/),
  content: PublicContentSchema,
  cta: z.object({label:z.string().trim().min(1).max(90),url:webUrl}),
  voice: z.object({audioUrl:z.string().startsWith('/d/'),segmentStartMs:z.literal(4700),segmentEndMs:z.literal(6650)}),
});
export const DemoRecordSchema = z.object({
  id: z.string().uuid(),
  publicToken: z.string().regex(/^[A-Za-z0-9_-]{10,32}$/),
  salesforceId: z.string().regex(/^(00Q|003)[A-Za-z0-9]{12}([A-Za-z0-9]{3})?$/).optional(),
  prospect: ProspectSchema,
  contentOverrides: PublicContentSchema.partial().optional(),
  pronunciation: z.object({churchName:z.string().trim().min(1).max(140)}).optional(),
  cta: z.object({label:z.string().trim().min(1).max(90),url:webUrl}).optional(),
  status: z.enum(['pending','generating','ready','voice_review_required','voice_unavailable','failed','disabled']),
  voiceCacheKey: z.string().optional(),
  audioPath: z.string().optional(),
  error: z.string().optional(),
});
export type Prospect = z.infer<typeof ProspectSchema>;
export type DemoRecord = z.infer<typeof DemoRecordSchema>;
export type PublicConfig = z.infer<typeof PublicConfigSchema>;

export const defaultContent = {
  introGreeting: 'Hey First Pentecostal Church,',
  introChurchName: 'First Pentecostal Church',
  customSceneText: {},
} as const;
export function publicConfig(record:DemoRecord, baseUrl:string):PublicConfig {
  const church=record.prospect.churchName;
  const o=record.contentOverrides||{};
  return PublicConfigSchema.parse({
    id:record.publicToken,
    content:{
      introGreeting:o.introGreeting||`Hey ${church},`,
      introChurchName:o.introChurchName||church,
      locationText:o.locationText||[record.prospect.city,record.prospect.state].filter(Boolean).join(', ')||undefined,
      customSceneText:o.customSceneText||{},
    },
    cta:record.cta||{label:'See Exbabel in Your Church',url:`https://exbabel.com/?source=personalized-demo&demo=${encodeURIComponent(record.publicToken)}`},
    voice:{audioUrl:`/d/${record.publicToken}/audio`,segmentStartMs:4700,segmentEndMs:6650},
  });
}
