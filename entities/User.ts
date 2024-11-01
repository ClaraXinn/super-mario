import { baseUrl } from "@/lib/utils";
import { Status, User } from "@prisma/client";

export class UserEntity {
  [x: string]: any;
  // Static property to hold the single instance of the class
  private static instance: UserEntity;
  private users: User[] = [];
  private usersLoaded: boolean = false;

  // Static method to provide access to the single instance of the class
  public static getInstance(): UserEntity {
    if (!UserEntity.instance) {
      UserEntity.instance = new UserEntity();
    }
    return UserEntity.instance;
  }

  public async getUsers(): Promise<User[]> {
    if (!this.usersLoaded) {
      await this.loadUsers();
    }
    return this.users;
  }



  public async viewUserAccountsEntity(): Promise<User[]> {
    const users = await this.getUsers();
    return users;
  }

  public async editUserAccountEntity(
    id: string,
    email: string,
    password: string
  ): Promise<boolean> {
    try {
      const data = {
        id,
        email,
        password,
      };
      const response = await fetch(`${baseUrl}/api/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.log("Entity update failed");
        return false;
      }
      console.log("Entity update success");
      await this.loadUsers();

      return true;
    } catch (error) {
      console.error("Failed to create user:", error);
      return false;
    }
  }

  public async suspendUserAccountEntity(
    id: string,
    status: Status
  ): Promise<boolean> {
    try {
      const data = {
        id,
        status,
      };
      console.log("data sending", data);
      const response = await fetch(`${baseUrl}/api/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.log("Entity update failed");
        return false;
      }
      console.log("Entity update success");
      await this.loadUsers();
      console.log("entitySuspend: ", this.users);

      return true;
    } catch (error) {
      console.error("Failed to create user:", error);
      return false;
    }
  }


  public async searchUserAccountEntity(email: string): Promise<User | null> {
    try {
      const response = await fetch(`${baseUrl}/api/users/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Error fetching user:", response.statusText);
        return null;
      }

      const res = await response.json();

      return res;
    } catch (error) {
      console.error("Failed to fetch user account:", error);
      return null;
    }
  }

  // Load users from the API, and cache the result
  private async loadUsers(): Promise<void> {
    try {
      const response = await fetch(`${baseUrl}/api/users`, {
        cache: "no-cache",
      });
      if (!response.ok) {
        console.error(`Error: Received status ${response.status}`);
        return;
      }

      const res = await response.json();
      

      this.users = res.users;


      this.usersLoaded = true;
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  }

  public async createUserAccountEntity(user: User): Promise<boolean> {
    try {
      const data = {
        ...user,
      };
      const response = await fetch(`${baseUrl}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        return false;
      }

      this.loadUsers();

      return true;
    } catch (error) {
      console.error("Failed to create user:", error);
      return false;
    }
  }

  public async verifyAccount({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<boolean> {
    try {
      const response = await fetch(`${baseUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if the response is not successful (status 200-299)
      if (!response.ok) {
        return false;
      }

      return true;
    } catch (error) {
      console.error("Failed to authenticate user:", error);
      return false;
    }
  }
}
