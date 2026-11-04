import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { apiClient } from "../lib/api-client.js";
import { Terminal, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, Button, Input } from "../components/ui/index.js";

export function DevicePage() {
  const [userCode, setUserCode] = useState("");
  const [status, setStatus] = useState("IDLE"); // IDLE | APPROVING | APPROVED | ERROR
  const [errorMsg, setErrorMsg] = useState("");
  const { user } = useAuth();

  const handleApprove = async (e) => {
    e.preventDefault();
    setStatus("APPROVING");
    setErrorMsg("");

    try {
      await apiClient.post("/auth/device/approve", { userCode: userCode.toUpperCase().trim() });
      setStatus("APPROVED");
    } catch (err) {
      setStatus("ERROR");
      setErrorMsg(err?.message || "Invalid or expired device code.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <Card accent="cyan" className="w-full max-w-md p-8 shadow-2xl text-left">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mx-auto mb-3 shadow-hud-cyan">
            <Terminal className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-on-surface tracking-tight">Authorize CLI Terminal</h1>
          <p className="text-xs text-on-surface-variant font-mono mt-1">
            Approving CLI access for <span className="text-on-surface font-semibold">{user?.email || "Current User"}</span>
          </p>
        </div>

        {status === "APPROVED" ? (
          <div className="p-6 rounded-xl bg-secondary/10 border border-secondary/30 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-secondary mx-auto" />
            <h3 className="font-bold text-base text-on-surface">Terminal Successfully Authorized!</h3>
            <p className="text-xs text-on-surface-variant">
              You can now return to your terminal. The <code>omniops</code> CLI has received your scoped access token.
            </p>
          </div>
        ) : (
          <form onSubmit={handleApprove} className="space-y-4">
            {status === "ERROR" && (
              <div className="p-3 rounded bg-error/10 border border-error/30 text-error text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono font-semibold text-on-surface mb-1.5">
                ENTER 8-CHARACTER CODE
              </label>
              <Input
                type="text"
                required
                maxLength={9}
                placeholder="ABCD-1234"
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                mono
                className="text-center text-2xl font-bold tracking-widest py-3 text-primary uppercase"
              />
              <span className="text-[11px] text-outline block mt-1">
                Enter the code displayed in your terminal window after running <code>omniops auth login</code>.
              </span>
            </div>

            <Button
              type="submit"
              variant="primary"
              loading={status === "APPROVING"}
              disabled={!userCode}
              className="w-full py-2.5 font-semibold text-sm"
            >
              Approve Terminal
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
