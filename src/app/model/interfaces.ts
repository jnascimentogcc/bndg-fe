export interface ResponseMessage {
  code: number,
  message: string,
}

// Interface ResumeData
export interface ResumeData {
  id: string,
  candidate_name: string,
  profile: string
}

// Interface List Resume
export interface ResumeListResponse extends ResponseMessage {
  data: ResumeData[]
}

// Interface BiddingData
export interface BiddingData {
  id: string,
  contract_authority: string,
  reference: string,
  procedure_program_file: string,
  notebook_charge_file: string,
  evaluated: string,
  evaluated_at: string,
  created_at: string,
  rational: string,
}

// Interface Bidding Response
export interface BiddingResponse extends ResponseMessage {
  data: BiddingData
}

// Interface List Bidding
export interface BiddingListResponse extends ResponseMessage {
  data: BiddingData[]
}

// Interface ProjectData
export interface ProjectData {
  id: string,
  customer_name: string,
  title: string,
  description: string,
  tech_stack: string,
  business_sector: string,
  service: string,
}

// Interface List Project
export interface ProjectListResponse extends ResponseMessage {
  data: ProjectData[]
}

// Interface Profile
export interface ProfileData {
  id: string,
  name: string,
  description: string,
}

// Interface List Profile
export interface ProfileListResponse extends ResponseMessage {
  data: ProfileData[]
}

// Interface Candidate
export interface CandidateData {
  id: string,
  name: string,
  final_resume: string,
}

// Interface List Candidate
export interface CandidateListResponse extends ResponseMessage {
  data: CandidateData[]
}

export interface FinalResumeData {
  profile: ProfileData,
  candidate: CandidateData,
  resume: CVData
}

interface CVData {
  academic: {
    title: string[];
  };
  certification: {
    certification: string[];
  };
  criteria: Criteria[];
}

interface Criteria {
  criteria: string;
  experiences: Experience[];
}

interface Experience {
  entity: string;
  period: string;
  experience: string;
}
