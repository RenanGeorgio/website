import { Job, Sponsor, Stage, Speaker } from '@types';

import * as datoCmsApi from './cms-providers/dato';

let cmsApi: {
  getAllSpeakers: () => Promise<Speaker[]>;
  getAllStages: () => Promise<Stage[]>;
  getAllSponsors: () => Promise<Sponsor[]>;
  getAllJobs: () => Promise<Job[]>;
  getAllPagesWithSlug: () => Promise<any[]>;
};

if (process.env.DATOCMS_READ_ONLY_API_TOKEN) {
  cmsApi = datoCmsApi;
} else {
  cmsApi = {
    getAllSpeakers: () => Promise.resolve([]),
    getAllStages: () => Promise.resolve([]),
    getAllSponsors: () => Promise.resolve([]),
    getAllJobs: () => Promise.resolve([]),
    getAllPagesWithSlug: () => Promise.resolve([])
  };
}

export async function getAllSpeakers(): Promise<Speaker[]> {
  return cmsApi.getAllSpeakers();
}

export async function getAllStages(): Promise<Stage[]> {
  return cmsApi.getAllStages();
}

export async function getAllSponsors(): Promise<Sponsor[]> {
  return cmsApi.getAllSponsors();
}

export async function getAllJobs(): Promise<Job[]> {
  return cmsApi.getAllJobs();
}

export async function getAllPages(): Promise<any[]> {
  return cmsApi.getAllPagesWithSlug();
}