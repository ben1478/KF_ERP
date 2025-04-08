function calendar(t,fPath)
{
	var sPath = fPath + "Calendar_Start.asp?fPath=" + fPath;
	strFeatures = "dialogWidth=206px;dialogHeight=206px;center=yes;help=no;directories=no;status=no;scrollbars=no;resizable=1;menubar=no";
	st = t.value;
	if (st==""){
		st=new Date();
	}
	sDate = showModalDialog(sPath,st,strFeatures);
	t.value = formatDate(sDate, 0);
}
function checkDate(t)
{
	dDate = new Date(t.value);
	if (dDate == "NaN") {t.value = ""; return;}
	iYear = dDate.getFullYear()

	if ((iYear > 1899)&&(iYear < 1950)){
		sYear = "" + iYear + ""
		if (t.value.indexOf(sYear,1) == -1){
			iYear += 100
			sDate = (dDate.getMonth() + 1) + "/" + dDate.getDate() + "/" + iYear
			dDate = new Date(sDate)
		}
	}
	t.value = formatDate(dDate);
}
function formatDate(sDate)
{
	var sScrap = "";
	var dScrap = new Date(sDate);
	if (dScrap == "NaN") return sScrap;

	iDay = dScrap.getDate();
	iMon = dScrap.getMonth();
	iYea = dScrap.getFullYear();

	sScrap = iYea + "/" + (iMon + 1) + "/" + iDay ;
	return sScrap;
}