/**
 * V1.9 visual tier catalogue (read-only).
 * Compatible with Supabase table: public.building_visual_tiers.
 * Visual changes must never mutate player_progress or player_buildings.
 */
export const VISUAL_TIER_IDS = Object.freeze({
  construction: "construction",
  architecture: "architecture",
  office: "office",
  residence: "residence",
});

export function localVisualTier(buildingId, level) {
  if (!Object.values(VISUAL_TIER_IDS).includes(buildingId)) return null;
  const n = Number(level);
  if (!Number.isInteger(n) || n < 1) return null;
  const tier = n < 5 ? 1 : n < 10 ? 2 : n < 15 ? 3 : 4;
  return {
    building_id: buildingId,
    visual_key: `${buildingId}_tier_${tier}`,
    tier,
    min_level: [1, 1, 5, 10, 15][tier],
    max_level: [1, 4, 9, 14, 20][tier],
  };
}

/**
 * Load visual metadata through an existing Supabase client.
 * Fallback is a valid tier mapping when offline.
 */
export async function loadBuildingVisualTier(supabase, buildingId, level) {
  const fallback = localVisualTier(buildingId, level);
  if (!fallback) return null;
  if (!supabase) return fallback;
  try {
    const { data, error } = await supabase
      .from("building_visual_tiers")
      .select("building_id,min_level,max_level,visual_key,style_name,asset_path")
      .eq("building_id", buildingId)
      .lte("min_level", level)
      .gte("max_level", level)
      .maybeSingle();
    if (error || !data) return fallback;
    return { ...fallback, ...data };
  } catch (_) {
    return fallback;
  }
}
