export enum Status {
    Active = 1,
    Inactive = 0
}

export enum IsDeleted {
    Deleted = 0,
    NotDeleted = 1
}

export enum AccountVerified {
    Yes = 1,
    No = 0
}

export enum IsRequired {
    Yes = 1,
    No = 0
}

export enum LeaveStatus {
    Approved = 1,
    Rejected = 2,
    Pending = 0,
}

export enum UserStatus {
    Active = 1,
    Banned = 0
}

export enum AccountVerifiedStatus {
    Pending = 0,
    Verified = 1,
    Rejected = 2
}

export enum StepVerifiedStatus {
    Success = 1,
    Pending = 0
}

export enum StepStatus {
    Active = 1,
    Inactive = 0
}

export enum LeaveType {
    Vacation = 1,
    Personal = 2
}

export enum AppointmentStatus {
    Upcoming = 6,
    Ongoing = 5,
    Completed = 4,
    Cancelled = 3,
    Rejected = 2,
    Pending = 0,
    Accepted = 1
}
