--!strict
-- Copied into ReplicatedFirst to ensure capturing PersistentLoaded event on client-side.
-- workspace is not properly replicated until after game.Loaded (cannot set attributes on workspace pre-Loaded)
if not game:IsLoaded() then
	game.Loaded:Wait()
end
if workspace.StreamingEnabled then
	workspace.PersistentLoaded:Once(function()
		workspace:SetAttribute("IsPersistentLoaded", true)
	end)
	task.delay(20, function()
		if not workspace:GetAttribute("IsPersistentLoaded") then
			-- fail-safe
			warn(`Took longer than 20 seconds for PersistentLoaded to fire; assuming persistent is loaded!`)
			workspace:SetAttribute("IsPersistentLoaded", true)
		end
	end)
else
	workspace:SetAttribute("IsPersistentLoaded", true)
end