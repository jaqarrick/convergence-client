import React, { useCallback, useEffect, useState } from "react"
import "./Room.css"
import { RouteChildrenProps } from "react-router-dom"
import SettingsMenu from "./room-components/settingsmenu/SettingsMenu"
import SettingsButtons from "./room-components/settingsbuttons/SettingsButtons"
import SettingsDisplay from "./room-components/settingsdisplay/SettingsDisplay"
import { userSettingsObject } from "../../../types/userSettingsObject"
import userDefinedSettings from "../../util/audio/userDefinedSettings"

interface RouteProps extends RouteChildrenProps<{ roomid: string }> {}
interface PassedProps {
	roomid: string | undefined | null
	roomAudioSettings: userSettingsObject[]
	setRoomAudioSettings: (settings: userSettingsObject[]) => void
	updateEffect: (
		effectName: string,
		effectGroup: string,
		paramName: string,
		update: string | number
	) => void
}

const Room: React.FC<PassedProps & RouteProps> = ({
	match,
	roomid,
	roomAudioSettings,
	updateEffect,
}) => {
	const [currentMenu, setCurrentMenu] = useState<
		userSettingsObject | null | undefined
	>(null)

	const [userSettings, setUserSettings] = useState<userSettingsObject[]>(
		userDefinedSettings
	)

	const [menusList, setMenusList] = useState<userSettingsObject[]>([
		...userSettings,
		...roomAudioSettings,
	])

	useEffect(() => {
		setMenusList([...userSettings, ...roomAudioSettings])
	}, [roomAudioSettings, userSettings, setMenusList])

	const switchMenus = useCallback(
		(menuName: string | null | undefined) => {
			const current = menusList.find(
				(settingsObject: userSettingsObject) =>
					settingsObject.settingsGroup === menuName
			)
			if (current) {
				setCurrentMenu(current)
			} else {
				setCurrentMenu(null)
			}
		},
		[setCurrentMenu, menusList]
	)

	return (
		<div className='room-container'>
			<SettingsButtons />
			<SettingsMenu
				switchMenus={switchMenus}
				currentMenuName={currentMenu?.settingsGroup}
				menusList={menusList}
			/>
			<SettingsDisplay currentMenu={currentMenu} updateEffect={updateEffect} />
			<h5
				style={{
					position: "absolute",
					bottom: 0,
					left: 0,
				}}>
				{" "}
				{roomid}{" "}
			</h5>
		</div>
	)
}

export default Room
