/* chrome api uses "@types/chrome" node_module package */
/* following is sample code to use chrome storage */

export class StorageUtils {

	static instance = null; // singleton object storage

	static getInstance() {

		if (StorageUtils.instance == null) {
			console.log("Singleton instantiated.");
			StorageUtils.instance = new StorageUtils();
		}

		return StorageUtils.instance;

	}

	/* local variables which store global data. Always in sync to global */

	rawData: any = null;

	/* get functions get data from global storage and load into local variable.
	App gets the data from the global variable */

	/* set functions set data into global storage and also update the local variable.
	so app can rely on local variable, without help of get functions */

	getDataFromGlobalStorage(callback) {
		var datakey = "allData";
		chrome.storage.sync.get(datakey, function (rawdataStore) {

			if (CommonUtils.isEmpty(rawdataStore)) // if key doesn't exist, it returns empty object.
				rawdataStore.allData = [];

			StorageUtils.getInstance().rawData = rawdataStore.allData;
			//	console.log(">:>>"+ StorageUtils.getInstance().rawData );
			callback();
		});

	}
	setDataToGlobalStorage(rawdt, callback) {
		var datakey = "allData";

		chrome.storage.sync.set({
			[datakey]: rawdt
		}, function () {
			console.log("Data Saved.");
			StorageUtils.getInstance().rawData = rawdt;
			callback();
		});
	}
	clearAllInGlobalStorage() {
		chrome.storage.sync.clear();
		StorageUtils.getInstance().rawData = [];
		console.log("Global storage reset done.");
	}
}

export class CommonUtils {

	static isEmpty(obj) {
		for (var key in obj) {
			if (obj.hasOwnProperty(key))
				return false;
		}
		return true;
	}

}

StorageUtils.getInstance().getDataFromGlobalStorage(function () {
	StorageUtils.getInstance().setDataToGlobalStorage(["data1", "data2"], function () {
		console.log(">>" + StorageUtils.getInstance().rawData);
	});
});
