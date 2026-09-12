import { NextRequest } from "next/server";
import { apiSuccess } from "@/lib/apiResponse";
import { facultyPublications, facultyPublicationStats } from "@/data/facultyPublicationsData";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase() || "";
  const personnel = searchParams.get("personnel") || "";
  const tier = searchParams.get("tier") || "";
  const type = searchParams.get("type") || "";

  let filtered = facultyPublications;

  if (personnel && personnel !== "all") {
    filtered = filtered.filter(p => p.facultyPersonnel.includes(personnel));
  }

  if (tier && tier !== "all") {
    filtered = filtered.filter(p => p.journalTier === tier);
  }

  if (type && type !== "all") {
    filtered = filtered.filter(p => p.articleType.includes(type));
  }

  if (q) {
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(q) ||
      (p.titleEn && p.titleEn.toLowerCase().includes(q)) ||
      p.journal.toLowerCase().includes(q) ||
      p.authors.some(a => a.toLowerCase().includes(q)) ||
      p.keywords.some(k => k.toLowerCase().includes(q)) ||
      p.abstractSummary.toLowerCase().includes(q)
    );
  }

  return apiSuccess(filtered, "ดึงรายการบทความวิชาการและวิจัยสำเร็จ", 200, {
    total: filtered.length,
    stats: facultyPublicationStats
  });
}
