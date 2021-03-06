import { ElectionScopeIncomplete } from "@code4ro/reusable-components";

export const toNumber = (x: string | number | null | undefined): number | null => {
  if (typeof x === "number") return x;
  if (!x) return null;
  const n = parseInt(x, 10);
  if (!Number.isFinite(n)) return null;
  return n;
};

export const scopeFromSearch = (searchParams: string): ElectionScopeIncomplete => {
  const params = new URLSearchParams(searchParams);
  const type = params.get("division");
  switch (type) {
    case "diaspora":
      return { type: "diaspora" };
    case "diaspora_country":
      return {
        type: "diaspora_country",
        countryId: toNumber(params.get("countryId")),
      };
    case "county":
      return {
        type: "county",
        countyId: toNumber(params.get("countyId")),
      };
    case "locality":
      return {
        type: "locality",
        countyId: toNumber(params.get("countyId")),
        localityId: toNumber(params.get("localityId")),
      };
    default:
      return { type: "national" };
  }
};

export const searchFromScope = (scope: ElectionScopeIncomplete): string => {
  if (scope.type === "national") return "";

  const params = new URLSearchParams();
  params.append("division", scope.type);

  switch (scope.type) {
    case "diaspora":
      break;
    case "diaspora_country":
      if (scope.countryId != null) params.append("countryId", scope.countryId.toString());
      break;
    case "county":
      if (scope.countyId != null) params.append("countyId", scope.countyId.toString());
      break;
    case "locality":
      if (scope.countyId != null) params.append("countyId", scope.countyId.toString());
      if (scope.localityId != null) params.append("localityId", scope.localityId.toString());
      break;
    default:
      break;
  }

  return params.toString();
};

export const prependQuestionMark = (s: string): string => (s ? `?${s}` : s);
