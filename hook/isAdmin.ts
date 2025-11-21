import { useEffect, useState } from "react";
import client from "@/api/client";
import { createClient } from "@/utils/supabase/client";

export function useAdmin() {
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [adminCreds, setAdminCreds] = useState(false);

  useEffect(() => {
    async function getAdmin() {
      const { data: sessionData, error: sessionError } =
        await client.auth.getSession();
      if (sessionError) {
        console.error("Error fetching session:", sessionError);
        return;
      }

      const id = sessionData?.session?.user?.id ?? null;
      setUserId(id);

      const { data: adminData, error: adminError } = await supabase
        .from("profiles")
        .select("isadmin")
        .eq("id", id)
        .single();

      if (adminError) {
        console.error("Error fetching admin creds", adminError);
      }

      setAdminCreds(adminData?.isadmin ?? false);
    }

    getAdmin();
  }, []);

  return { userId, adminCreds };
}
