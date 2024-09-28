interface MenuItem {
    label: string;
    action: () => void;
  }
  
  interface RoleOptions {
    [role: string]: MenuItem[];
  }
  
  export const roleOptions: RoleOptions = {
    admin: [
      { label: "Dashboard", action: () => console.log("Dashboard clicked") },
      { label: "Manage Users", action: () => console.log("Manage Users clicked") },
      { label: "Reports", action: () => console.log("Reports clicked") },
      { label: "Settings", action: () => console.log("Settings clicked") },
    ],
    company: [
      { label: "Company Profile", action: () => console.log("Company Profile clicked") },
      { label: "Job Listings", action: () => console.log("Job Listings clicked") },
      { label: "Applications", action: () => console.log("Applications clicked") },
      { label: "Account Settings", action: () => console.log("Account Settings clicked") },
    ],
    jobseeker: [
      { label: "Search Jobs", action: () => console.log("Search Jobs clicked") },
      { label: "Saved Jobs", action: () => console.log("Saved Jobs clicked") },
      { label: "Applications", action: () => console.log("Applications clicked") },
      { label: "Profile Settings", action: () => console.log("Profile Settings clicked") },
    ],
  };
  