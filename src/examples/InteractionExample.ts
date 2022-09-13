import { Interaction } from "../../structures/Interaction";

export default new Interaction()
.setName("")
.setDescription("")
.setEnabledCommand(true)
.setBotPermissions([])
.setMemberPermissions([])
.setChannelOnly(false)
.setSameChannel(false)
.setCheckQueue(false)
.setDJOnly(false)
.setCallback(async ({ bot, int }) => {
    try {
	//
    } catch (error) {
        console.error(error);
    }
});
