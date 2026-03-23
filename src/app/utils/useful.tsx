export function byteToSize(kb: number): string {
  if (kb === 0) return `0 bytes`;

  const arr = ["bytes", "KB", "MB"];
  const i = Math.floor(Math.log(kb) / Math.log(1024));
  return `${(kb / 1024 ** i).toFixed(0)} ${arr[i]}`;
}

export function getFileCategory(
  mimeType: string,
): "image" | "video" | "document" | "audio" | "other" {
  if (!mimeType) return "other";

  const type = mimeType.toLowerCase();

  if (type.startsWith("image/")) return "image";
  if (type.startsWith("video/")) return "video";
  if (type.startsWith("audio/")) return "audio";

  const docTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "text/plain",
    "text/csv",
    "application/json",
    "application/x-zip-compressed",
    "application/zip",
  ];
  if (docTypes.includes(type)) return "document";

  return "other";
}

export function getDeletionCountdown(trashedAt: string): string {
  let normalizedDateStr = trashedAt.trim();
  if (!normalizedDateStr.includes("T")) {
    normalizedDateStr = normalizedDateStr.replace(" ", "T");
  }
  if (!normalizedDateStr.endsWith("Z") && !normalizedDateStr.includes("+")) {
    normalizedDateStr += "Z";
  }
  const trashedDate = new Date(normalizedDateStr);

  const SEVEN_DAYS_MS = 30 * 60 * 1000;

  const deletionDate = new Date(
    trashedDate.getTime() + SEVEN_DAYS_MS,
  ).getTime();
  const currentDate = Date.now();
  const diffMs = deletionDate - currentDate;
  // console.log("normalized -> ", new Date());

  if (diffMs <= 0) {
    return "deleted";
  }

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor(diffMs / (1000 * 60));
  console.log(diffDays, diffMins);
  if (diffDays > 1) {
    return `${diffDays}days`;
  }

  if (diffDays === 1) {
    return "tomorrow";
  }

  if (diffHours >= 1) {
    return `${diffHours} hr${diffHours > 1 ? "s" : ""}`;
  }

  if (diffMins >= 1) {
    return `${diffMins} min${diffMins > 1 ? "s" : ""}`;
  }

  return "less than 1min";
}

export const normalizeResponse = (data: any): any => {
  if (data === null || data === undefined) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(item => normalizeResponse(item));
  }

  if (typeof data === 'object') {
    const normalized: any = {};
    for (const [key, value] of Object.entries(data)) {
      if ((key === 'id' || key.endsWith('_id')) && typeof value === 'string' && /^\d+$/.test(value)) {
        normalized[key] = Number(value);
      } else if (typeof value === 'object') {
        normalized[key] = normalizeResponse(value);
      } else {
        normalized[key] = value;
      }
    }
    return normalized;
  }

  return data;
};

export const normalizeFileData = (data: any) => {
  console.log("normalizing data -> ", data);
  return normalizeResponse(data);
};